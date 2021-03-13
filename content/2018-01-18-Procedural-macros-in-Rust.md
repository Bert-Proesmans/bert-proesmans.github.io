+++
title = "Procedural macros in Rust"
description = "It's essentially you writing code which writes code for you."
date = 2018-01-18

[taxonomies]
categories = ["Rust"]
tags = ["Procedural macros"]
+++

Sooo.. [Meta-Programming](https://en.wikipedia.org/wiki/Metaprogramming)! It's essentially you writing code which writes code for 
you.  
Within programming languages you do 'it' by implementing **macro-instructions**, which can be called by your other code.  
The exact purpose of a macro is completely up to the developer to define and usage of useful macros potentially saves 
development time.. When all goes right.

Rust specifically has various ways to implement and call a macro. For a complete explanation of the current state of macros 
within Rust, read 
[this post by Steve Klabnik](http://words.steveklabnik.com/an-overview-of-macros-in-rust).
Throughout this post you might have to re-visit that link.

My first time touching Rust was in September 2017, which means it has been about 4 months since I started hacking with the
language. How I feel about my acquired experiences so far will be the subject for another post.  
My first contact with macros, though, was only a month ago!  
Fairly recently i started using `macro_rules!()`. This is a macro in itself and makes it both simple to 
write and use **Declarative Macros**. These macros are straight forward; you implement it with a code template containing placeholders. When calling the macro you provide it arguments, which fill in the placeholders. Simple!

> By the way: macro_rules!() is not the only useful macro exposed to developers within the standard library. Probably the most
> written Rust statement, `println!()`, is also a macro!  
> It's purpose when expanded is to write text to the standard out-stream.. and it even formats that text for you!

The next step in the macro evolution is more interesting, **Procedural Macros**. This kind is the actual topic of the post 
you're reading.  
Procedural macros are often described as 'compiler plugins' and that name is not pure hype, because you gain the
possibility of completely rewrite (syntax!) parts of your source code with such macros.  
Although this promises great power, there are still issues preventing a stable implementation of procedural macros. 
The main issue I personally struggle with is **Macro Hygiene**. Hygiene stands for *NOT* unnecessarily exposing (leaking) 
types into the macro template code.  
This is actually really important because code needs to be properly namespaced. This prevents common, but practically invisible, bugs from variable name- or type shadowing. Of course this feature works in both directions; types injected by procedural macros
are not in some kind of global namespace!  
So in the end there has been much, and still ongoing, discussion about how to properly import and export types from a 
procedural macro.

> As of now there is a lot of functionality not implemented in the stable Rust compiler, including procedural macros.
> To start using them you will need the Rust Nightly compiler and enable the feature at the start of your code.  
> The Nightly compiler is where all the cool kids hang out currently trying to improve and discuss about correct and/or misbehaviour.

From the beginning I desired this post to be about successfully utilizing procedural macros in Rust, but in reality I'm struggling with the aforementioned hygiene issues.  
So far i have been partially successful in implementing a procedural macro attribute which injects a newly constructed 
enum type into the code before compiling. The exact issue is explained in 
[this post on the Rust Users forum](https://users.rust-lang.org/t/issue-resolving-module-imports-after-applying-proc-macro-attribute/15090).  
I sincerely hope this issue can be resolved soon (a PR is in the making) and in the meantime I'll just research more into the 
features within Rust.

Happy hacking!
