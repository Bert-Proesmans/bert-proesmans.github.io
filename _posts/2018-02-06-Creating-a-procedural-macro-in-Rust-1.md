---
layout: post
title: "Creating a procedural macro in Rust Pt. 1"
description: "Procedural macros are relatively new. Because of that it's quite possible you'll
encounter a few compilation errors."
---

Procedural macros are relatively new. Because of that it's quite possible you'll
encounter a few compilation errors. 
Normally, in Rust, the compiler helps you out effortlessly, but the lack of properly 
understanding macro hygiëne and token spanning will result in confusing errors anyway.  
I took the leap and wrote my own procedural macro, which is now released on
[crates.io](https://crates.io/crates/value_from_type_macros). That macro will be the subject of
these posts while I try to explain and provide solutions for compilation errors.  
The complete source of this macro can be found on 
[github](https://github.com/Bert-Proesmans/value-from-type-derive), if you're interested.

# Ready to go?

Make sure you have the Rust Nightly Toolchain installed, which can be done through the Rustup tool.
This post also presumes you have already minimal knowledge of the Rust programming language and the
Cargo tool.

> A nightly compiler is not necessary per se, but it allows me to show off some cool features which
> haven't arived on stable yet.

# Starting off

A procedural macro must reside in it's **own crate**. This 'macro-crate' is only allowed to export macros 
and that's, in my opinion, already an unusual constraint. Right off the bat we need to work around
this structural limitation by declaring two crates; 1 for all our macros and 1 for dependant types.
Let us call them 'crate M' and 'crate T' respectively.  
The crate containing your application code, which we'll call 'crate A', will have both crate M and T as dependancy.  
*DO NOT* make the macro crates dependant on each other or your application crate, these links will result
in compilation errors because of circular dependancies. When necessary we can make additional dependancy
links inside the expanded code from our macro.

Building a procedural macro crate is quite simple. Inside the `Cargo.toml` file you add the following code:

```toml
[lib]
# Changes the build target
proc-macro = true
```

# Procedural macro template

Throughout this post I'll use the terms 'procedural macro', 'procedural macro attribute' and 'macro method' so I'd like to take a moment first and explain each of them.  
A procedural **Macro** is essentially a compiler extension which you can write yourself in Rust code. These macros
allows for automatic code generation, constraints checking and more. Since it's "just Rust code" you can make
it do anything by utilising the standard library or external crates. Possibilites are endless.  
A procedural macro **Attribute** is a kind of procedural macro which is invoked using a specific syntax. These
macros are attributed to your Rust code and will interact with, or rather manipulate, that code.  
A macro **Method** is the method called by the Rust compiler when a procedural macro is *resolved* (or called).
These methods communicate with the Rust compiler and contain the logic of a macro.

For now we'll only focus on the crate which we marked with `proc-macro = true`, crate M. We'll start by declaring
and exporting our own procedural macro attribute at the root of that crate.
Consider the following code:

```rust
#![feature(proc_macro)]

extern crate proc_macro;

use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn value_from_type(args: TokenStream, input: TokenStream) -> TokenStream {
    println!("[BUILD] Running proc macro");
    TokenStream::empty()
}
```

That's a minimal code to get started writing a macro, let's explain what each line does.  
`#![feature(proc_macro)]` indicates to the compiler that we want to enable the 
[procedural macro feature](https://doc.rust-lang.org/unstable-book/language-features/proc-macro.html).  
Note that **BOTH** the procedural macro crate **AND** the application crate **MUST** have this feature 
enabled for the macro to work.

> Following the above link will guide you to the -Unstable Book- containing lots of information about nightly
> compiler features. It's a good read for more advanced Rustaceans.

The next lines, starting with `extern crate`, should be obvious. We explicitly import our dependancy crates
to be used in our own code. In this case the crate 'proc_macro' is imported, which is made available by the 
compiler because we're targetting to build a procedural macro.  
The `use` statement simply re-imports the TokenStream item into our current module.

Our macro is called `value_from_type`, which matches the identifier of the method exactly. This is important
because there is **NO** other way to name our procedural macro.  
It's attribute `#[proc_macro_attribute]` registers the method, so it's called when the attribute is *resolved*.  
The method takes two arguments, both typed `TokenStream`, which is an agreed upon interface for each procedural
macro attribute. `args` contains the arguments passed into the attribute call. `input` contains code from 
the subject, this is the code attached to the attribute.

This macro method does exactly one thing, printing to the standard outstream when it's executed. You'll see 
this message printed by the compiler, on the standard outstream, when the procedural macro attribute is 
used within application code.

## Attribute arguments 

Procedural macro attributes are attached to [Items](https://docs.rs/syn/0.12/syn/enum.Item.html). Note that Item is 
used here in syntactic context. A Struct, Enum or Method are Items, even a Module like the example below.  
When attaching an attribute to an Item you can pass it one or more arguments. The arguments could be anything
actually because we're responsible of parsing them ourselves.  
Taking it to the extreme we could even write Rust code as an argument to our attribute macro!

```rust
// Here we are calling the macro value_from_type with arguments `arg1, arg2, arg3`
#[value_from_type(arg1, arg2, arg3)]
mod item_mod {}

// Here we are calling the macro value_from_type with arguments `"1=Monkey | name=Barry"`
// 
// Note the difference in attribute placement, this form is equivalent to the previous example
// but here we used an INNER ATTRIBUTE.
mod item_mod_2 {
	// Note '#!' at the start of the line
    #![value_from_type(1=Monkey | name=Barry)]
}
```

As you can see, anything can be passed down as argument, as long as you are able to
parse it.

## Attribute input

The input of a procedural macro attribute is the Item attached to it. The compiler will check for syntax errors and 
pass the entire Item into the macro method. This means that the original code is effectively removed from the
file during compilation.  
It's expected from the attribute macro to transform the input and return a some output back into the compiler. 
Most of the time it's desired that the input is copied into the output.

There is ONE important detail; invoked macro attributes are removed from the input! This is important to make sure that
the macro expansion process is **finite**.

```rust
// Our attribute value_from_type is linked to Item item_mod
#[value_from_type()]
// The entire module code, including the mod keyword and braces, is passed 
// into the macro value_from_type as input
// <--
    mod item_mod {
        struct Test;
    }
// -->
```

This example shows what's effectively being passed into the macro as input. Note that this scenario is similar when using
inner attributes.

# Procedural macro usage

Let's continue with the provided macro method example since I haven't explained what `TokenStream::empty()` means.  
As mentioned earlier the compiler will pass down the code of the Item attached to the attribute being executed as input.
The macro method is expected to return Rust code to replace what was originally passed as input argument.  
As for the example, it's actually returning nothing (= no code). This results in all attributed code to disappear during compilation.

"But what is a TokenStream exactly?", you might ask. To explain this I need to start with
how modern compilers work. As you might have figured there are a lot of steps necessary
to transform some code into machine instructions. To not reinvent the wheel every time
another language or system platform is built modern compilers are seperated into a
'frontend' and 'backend' system. The frontend is responsible for processing the
programming language and transforming it into some intermediate format. The backend will
transform that intermediate format into the desired machine code. All components of the
compiler are free to analyze and manipulate it's data, but operations performed on
the intermediate code representation can be in every context easily reused.  
The Rust compiler (rustc) is actually a frontend of the compiler system, with LLVM as
as backend component for generating machine code. The intermediate code representation
is LLVM IR in this case.  

Back to TokenStream then, it's basically an intermediate representation between rustc
and procedural macros. This approach of processing and returning TokenStreams was chosen
because rustc internally makes use of these tokens because they represent the Abstract
Syntax Tree (AST). The AST-data is produced by parsing Rust code.  
Exposing an intermediate representation allows the rustc developers to limit exposure
of the compiler internals to procedural macros. Allowing procedural macros to straight up
use internal compiler code would constraint developers from making breaking changes to
the compiler. This would break all existing procedural macros.

# Building the macro

The next step is to actually write code inside the macro method. Of course we want our macro attribute to do something
useful, that's why in the next post I'll describe how and why my ```value_from_type``` macro works.

Happy hacking!
