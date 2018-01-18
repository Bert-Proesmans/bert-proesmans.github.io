---
layout: post
title: Procedural macros in Rust
---

Sooo.. [Meta-Programming](https://en.wikipedia.org/wiki/Metaprogramming)! It's essentially you writing code which writes code for 
you.  
Within programming languages you do 'it' by implementing **macro-instructions**, which can be called by your other code.  
The exact purpose of a macro is completely up to the developer to define, but usage of useful macros potentially saves 
development time.

Rust specifically has various ways to implement and call a macro, for a complete explanation you best read 
[this post by Steve Klabnik](http://words.steveklabnik.com/an-overview-of-macros-in-rust).
Throughout this post I'll be referring back to that post.

My first time touching Rust was in September 2016, which means it has been about 4 months since I started hacking with the
language. How I feel about my acquired experiences so far will be the subject for another post.  
My first contact with macros, though, was through `macro_rules!()`. This is a macro in itself and makes it both simple to 
write and use Declarative Macros. These macros are straight forward; you implement it with a code template containing placeholders.
The placeholders are filled in with the parameters you provide when calling the macro.

> By the way: macro_rules!() is not the only useful macro exposed to developers within the standard library. Probably the most
> written Rust statement, `println!()`, is also a macro!  
> It's purpose when expanded is to write text to the standard out-stream.. and it even formats that text for you!

The next step in the macro evolution is more interesting, Procedural Macros. This kind is the actual topic of the post 
you're reading. Procedural macros are often described as 'compiler plugins' and that name is not pure hype, because you gain the
possibility of completely rewriting (syntax!) parts of your source code with such macros.  
Although this explanation sounds great, there are still issues preventing a stable implementation of procedural macros. The main issue
I personally struggle with is 'macro hygiene'. The term hygiene stands for **NOT** unnecessarily exposing (leaking) 
types into (and I suppose the other way around as well) the macro template code. This is actually important because code 
needs to be properly namespaced. This prevents common, but practically invisible, bugs from variable name- or type shadowing.

> As of now there is a lot of functionality *not* implemented in the stable Rust compiler, including procedural macros. To start
> using them you will need the Rust Nightly compiler and enable the feature at the start of your code.  
> The Nightly compiler is where all the cool kids hang out currently trying to improve and discuss about correct and/or misbehaviour.

From the beginning I desired this post to be about successfully utilizing procedural macros in Rust, but in reality I'm struggling 
with the aforementioned hygiene issues.  
So far i have been partially successful in implementing a procedural macro attribute which
injects a newly constructed enum type into the code before compiling. The exact issue is explained in 
[this post on the Rust Users forum](https://users.rust-lang.org/t/issue-resolving-module-imports-after-applying-proc-macro-attribute/15090).  
I sincirely hope this issue can be resolved soon and in the meantime I'll just research more into the features within Rust.

Bert
