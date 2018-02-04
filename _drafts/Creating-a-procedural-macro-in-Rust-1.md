---
layout: post
title: Creating a procedural macro in Rust Pt. 1
---

Procedural macros are relatively new and you'll definitely encounter some issues. 
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
and that feels already counter-intuitive. Right off the bat we need to work around
this structural limitation by declaring two crates; One for all our macros and One for dependant types.
For simplicity we'll call them 'crate M' and 'crate T' respectively.  
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

Note that this build target is responsible for the additional constraints on what we can export from that crate.

# Procedural macro template

Throughout this post I'll use procedural macro, procedural macro 
attribute and macro method interchangeably and I want to clarify these expressions beforehand.  
A procedural macro is essentially a compiler extension which allows for automatic code generation, constraints
checking and more. Since it's completely written in Rust itself you could even let it make API calls to a
web-server.. Possibilites are endless.  
A procedural macro **Attribute** is a kind of procedural macro which is invoked using a specific syntax. These
macros are attributed to your Rust code and will interact with it.  
A macro **Method** is the method called by the Rust compiler when a procedural macro is *resolved* (or called).
These methods contain the logic of a macro and communicate with the Rust compiler.

For now we'll only focus on the crate which we marked with `proc-macro = true`, crate M. The intention is to export our 
newly created macro at the root of the crate.
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

That's already a lot to process, so we'll start with the first line `#![feature(proc_macro)]`. This indicates to 
the compiler that we want to enable the 
[procedural macro feature](https://doc.rust-lang.org/unstable-book/language-features/proc-macro.html), **BOTH** the
procedural macro crate **AND** the application crate **MUST** have this feature enabled for the macro to work.

> Following the above link will guide you to the -Unstable Book- containing lots of information about nightly
> compiler features. It's a good read for more advanced Rustaceans.

The next lines, starting with `extern crate`, should be obvious. We explicitly import our dependancy crates
to be used in our own code. The `use` statement simply re-imports the TokenStream item into our current module.
Here-after the actual macro code follows.

Our macro is called `value_from_type`, which matches the identifier of the method exactly. This is important
because there is **NO** other way to name our procedural macro. It's attribute `#[proc_macro_attribute]` registers
the method, so it can be called when the attribute must *resolve*.  
The method takes two arguments, both typed `TokenStream`, which is the prototype for each proc macro attribute.
`args` contains the arguments passed into the attribute call. `input` contains code from the subject, this is 
the item on which the attribute is invoked.

This macro method does exactly one thing, printing to the standard outstream when it's invoked. That message will be
printed onto the compilation log when you're using this macro inside your application crate.

## Attribute arguments 

Procedural macro attributes are attached to [Items](https://docs.rs/syn/0.12/syn/enum.Item.html). Note that Item is 
used here in syntactic context. A struct, enum or method are Items, even a module like the example below.  
When attaching an attribute to an Item it's possible to pass it one or more arguments. The arguments could be anything
actually because we're responsible of parsing them ourselves.  
Taking it to the extreme we could even write Rust code as an argument to our attribute macro!

```rust
// Here we are calling the macro value_from_type with arguments `arg1, arg2, arg3`
#[value_from_type(arg1, arg2, arg3)]
mod item_mod {}

// Here we are calling the macro value_from_type with arguments `"1=Monkey | name=Barry"`
// 
// Note the difference in attribute placement, this form is equivalent to the previous example
// but here we used an INNER ATTRIBUTE
mod item_mod_2 {
    #![value_from_type("1=Monkey | name=Barry")]
}
```

As you can see anything can be passed down as argument.  
Note however, the Rust compiler will also run a syntax check on our arguments. If you want to deviate from the default
tuple pattern (first argument example) you'll need to wrap your arguments in double quotes to make it a string.

## Attribute input

The input of a procedural macro attribute is the Item attached to it. The compiler will syntax check and pass the entire
Item into the macro method. This means that the original code is effectively removed from the file during compilation.  
It's expected from the attribute macro to transform the input and return a complete output back into the compiler. 
Most of the time it's desired that the input is copied into the output.

There is ONE important detail; invoked macros will be removed from the input! This is important to make sure that
the macro expansion process is **finite**.

```rust
// The attribute is linked to Item item_mod
#[value_from_type()]
// The entire module code, including the mod keywoard and braces, is passed 
// into the macro value_from_type as input
// <--
    mod item_mod {
        struct Test;
    }
// -->
```

Here we see what's effectively being passed into the macro as input. Note that this scenario is similar when using
inner attributes.

# Procedural macro usage

Let's continue with the provided macro method example since I haven't explained what `TokenStream::empty()` means.  
As mentioned earlier the compiler will pass down the code of the Item attached to the attribute being executed as input.
The macro method is expected to return Rust code to replace the original code of the Item.  
As for the example, it's actually returning nothing (= no code), which would cause all code attached to that macro
attribute be removed during compilation.

# Building the macro

The next step is to actually write code inside the macro method. Of course we want our macro attribute to do something
useful, that's why in the next post I'll describe how and why my ```value_from_type``` macro works.

Happy hacking!