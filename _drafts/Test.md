---
layout: post
title: Test draft
---

```rust

use std;

fn main() {}


pub fn trait Test<G>
where
	G: std::fmt::debug,
{
	fn print(item: G) -> Result<(), String> {
		println!("{:?}", item);
	}
}
```
