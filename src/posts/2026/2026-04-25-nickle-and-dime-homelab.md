---
title: "How I nickle-and-dime'd my homelab"
description: "Make it.. complex. Yes, complex"

date: 2026-04-25

tags: ["Homelab"]
---

A homelab takes some form between two extremes. Some people build small with a secondhand laptop while others live their best life with enterprise grade electronics. The latter is obviously more expensive, and loud, but also more expensively loud[^expensively_loud]. A good way to visualize what I'm talking about is to take a peek at the [/r/homelab](https://reddit.com/r/homelab) and [/r/homedatacenter](https://reddit.com/r/homedatacenter) communities.

[^expensively_loud]:
    The running cost of enterprise equipment has higher electricity cost because the electronics are built for performance with trade-off in efficiency. And because computers are merely toasters with computation as a side-effect, even more electricity is required to cool these electronics!

The reasonable thing to do when you want to have a physical homelab[^myriad_of_reasons] is to start out with a secondhand desktop computer. This is very likely the best balance between upfront cost, power usage, and computing performance. A good suggestion for all beginners[^laptop]. From that point on you add more components as your requirements change.
People who want to buy new, or those with more specific requirements, get a power efficient computer[^n100] based on the N100 CPU. These little efficient computers are versatile and performant while having low idle power draw. They used to cost two to three hundred dollar per unit[^rising_prices] which makes "having a homelab" an affordable hobby.

[^myriad_of_reasons]:
    For the myriad of reasons I won't discuss in this post.

[^laptop]:
    A secondhand laptop is the second best approach because the built-in battery might need special care.  

[^n100]:
    You'll see people mention very small formfactor computers that make use of the Intel N100 (N150 nowadays) processor. Often bought from AliExpress (this is not an endorsment, you're responsible for your own decisions).

[^rising_prices]:
    Computer parts are, compared to a couple of years ago, expensive. For hardware in the same performance category expect to pay twice to three times the amount of money.

Note that I specifically mentioned **physical** homelab. There is also the option to rent someone else's computer, this service is called "Virtual Private Server" (VPS). With hardware prices being as high today, a VPS is an attractive option for homelabs[^vps_lab] with little to no specific requirements. VPS services have special management tools to fix issues and emergencies as a big advantage over managing your own hardware. A VPS is ironically a better general recommendation, but only when you're not interested in learning about computer components and how to maintain them.

[^vps_lab]:
    This is not purely a "lab at home" anymore, but the point of having ownership over your own services and data still stands.

## Requirements

With basic introduction to homelab hardware done, it's important to specificy the requirements for _my own_ homelab. Every decision I describe below is made considering all requirements. If you use my homelab design as a template, make sure to adjust for your own requirements!

| Requirement | Details |
| --- | --- |
| Services | I need an identity system (Kanidm), a password database (Vaultwarden), a wiki (bookstack), a computer-backup service (Resilio sync), a picture database (Immich)
| Capabilities | Image/Video decoding and encoding, high-speed encryption (TLS)
| Processing power | Fast enough to run a database, maintain logs, handle low service usage (from family members), and manage media encoding quickly
| Storage | Enough for backups of important files (couple of gigabytes per computer), and a 2TB family media archive. The data medium **must** resist [bitrot](https://en.wikipedia.org/wiki/Data_degradation).
| Uptime | Identity system, password database must have a 99% availability. The other stuff is preferably also available all the time.
| Backup | One copy at home, one copy stored elsewhere.

## Cheap storage

Right away the storage requirements are a pain, more than 2TB of usable space lands in a gap where no external storage service has a good value[^cloud_storage_value] option. I find the consumer cloud providers have good value plans up to around one terabyte of storage. If you need more, then the plans jump to 5TB or 10TB of reserved storage. There is no pay-for-usage pricing plan, so I have to pay for storage allocation I wouldn't be using immediately.  
Commercial cloud providers do price per gigabyte used, and their unit price is very good for file/blob storage. When electricity costs are calculated in it's cheaper to put data into the cloud compared to the cost of running a computer with physical hard disks at home.  
But this is not a functional apples-to-apples comparison. I must compare _block storage_ and of equal type (solid state vs hard disk). Not every cloud provider provisions hard disks, and even then the calculation becomes complex due to electricity pricing volatility.

The figure I calculated for my own situation makes cloud block-storage ballpark 20 to 30 times as expensive compared to hard disks cost per gigabyte, meaning my costs would reach a break-even point in a few months. Buying physical hard disks is an obvious decision given these numbers.

[^cloud_storage_value]:
     The value is good if the cost of file/blob storage over a couple of years is roughly equal or lower to the cost of buying the harddisks upfront.

## Cheap compute

\*TODO*


## Cheap web-performance

\*TODO*

---
I publish immediately for peace of mind, and regularly revisit my content to look for opportunities to improve.

**"And if they are blockading the strait, WE'LL also blockade the strait"** - _NO idea factory_