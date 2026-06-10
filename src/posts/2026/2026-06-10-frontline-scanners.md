---
title: Serial scanning at the frontline
description: Frontline workers, so we put scanning guns in their hands

date: 2026-06-10

tags: ["Zebra", "Frontline"]
---

At my current workplace I've experimented with a bunch of operational equipment to support our warehouse and production staff. Our processes always incorporated serial number tracking, and keeping track of lots of long strings of alphanumeric characters manually is error prone.
With an a priori mutual understanding that correct serial number tracking only has benefits further down the process flow, the challenge becomes a tooling problem; how to best support our staff with creating and registering serial numbers, using technology[^technology].

[^technology]: I'm an IT guy, my expertise is about technology. Often the answer is _not_ to use technology, but problems perspective-changed into tooling problems always benefit from technology.


## Serial numbering equipment

We've been lucky to encounter a partner organization that provided all (technical) information and (practical) demonstrations to us for solving our challenges. The short story is that we were naïve initially and had to iterate on the whole ecosystem a couple of times. We started out almost 8 years ago with DIY solutions incorporating amazon-bought hardware and filled gaps with custom software development, this experience made us overconfident and blind to the possibilities of buying better integrated solutions (which also had a 50x higher purchase cost).  
We finally settled on zebra printers (ZT-410) and zebra handheld scanners (TC-58).

We had to test various printing drivers, kept swapping between those produced by Seagull and Zebra (official). Figuring out proper print alignment was hell, and we also kept swapping between pixel print and raw ZPL.  
We settled on using multiple printers, each one for a different purpose with its own label kind and print settings. We use the official Zebra print driver to regularly push correct printing settings to each printer and send instanced ZPL for each print batch.

The scanning story is longer, we tried dedicated scanners handhelds, scanning guns with integrated mobile device, and eventually settled on all-in-one devices (scanning, IT, VOIP) for its compactness and similarity to a smartphone. The TC-5x series is, compared to the shitty hardware/software mess that came before it, impressive on paper. In practice I very much like the TC-58 devices we chose, it is a device that properly blurs the line that differentiates IT from OT equipment [^OT_equipment]. Of course, it's still an expensive device. Having optimized heavily for value and with practical experience, the TC-58 is a very solid purchase whatever the specific situation (basically a good entry-level device).

[^OT_equipment]: The replacement model TC-501 is actual luxury by comparison. I'm really happy to see hardware manufacturers cleaning up their image of overpriced and underpowered niche devices that include a shitty software experience. This is positive elation coming from the same guy (me) that cursed Zebra and companions for their shitty products throughout the last decade.

And today, after the update to version `14-35-10.00` (Android 15), the TC58 also properly supports passkey storage on-device! 🥳
It took me weeks complaining to Zebra about this lacking feature and frankly gave up.. until I was positively surprised that they "found and fixed the bug" aka enabled passkey provider support! What this implies is that the device can be properly deployed ~securely like a modern computer (supporting modern mobile device management (MDM) enrollment and secure storage of user-specific security tokens).  
There is also a TC-58e product whose specification sheet explicitly mentions TPM capabilities (required for on-device secret storage) within the chipset, but nothing similar for the TC-58. This made me sad that the devices I bought[^requirements] were explicitly nerfed on that aspect to differentiate for pricing related reasons. Many thanks to Zebra support and developers for their efforts, now I don't need to buy the TC58e editions instead!

[^requirements]: To be fair to all people and Zebra involved. The scanners were bought before we had our a-many iterations on our MDM processes and passkey or TPM integration capability wasn't on the requirements list then.
