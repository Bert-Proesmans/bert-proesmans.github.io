---
title: "How I monitor my emergency account"
description: "ALERT! Break glass to proceed"

date: 2026-04-27
draft: true

tags: ["Microsoft", "Entra"]
---

Every guide for improving your cybersecurity posture will suggest configuring an exception into all your security policies for an emergency (break-glass) account. This emergency account exists, with some type of administrator privilege, to undo changes that lock people out of a system. This approach falls in line with the process of having a backup, but for accounts instead of data.

The combination of a highly priviledged account being exluded from security policies.. feels icky. The existence of this account is more like a security disaster instead of a good practice. Like an open backdoor that thieves can use to enter your house, while the front door is a very nice one with all security bells and whistles.  
If we have to have this backdoor[^emergency_account], then we better watch very closely who is using it.

[^emergency_account]:
    Administrators can make mistakes and lock themselves out of the system, there is also the risk of a hacker disabling access for all administrators. A magical emergency account is often the only way to restore systems to operational state.

## Keeping watch

If you have an important door, you want to be certain who, when and if that door opened. A security camera and an open-sensor provide this information. The same logic applies to an account system.
A succesful login on your account triggers a sensor and immediately sends out a notification.  
You'll have encountered this if you have a Google/GMail account; for every new login on an unknown device[^unknown_device] you receive a phone notification and email (also on your recovery email address). A new succesful login is a very important signal in the context of security. This system just works for all accounts, no special setup required, and I think Google does a good job in this instance!

[^unknown_device]:
    An unknown device is one where the account hasn't been logged in before (or the device lost all google-related cookies). The condition on "unknown device" prevents the system from sending too many notifications.

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/google-alert.drawio.svg",
  "alt": "google email alert",
  "caption": "Email notification about new account login on unknown device",
  "widths": [650]
} %}

The emergency account mentioned in the introduction is, sadly, not a Google account but a Microsoft Entra account.

## Microsoft Entra

Microsoft Entra doesn't have a similar notification system to Google. In fact the Entra systems were originally designed to run all login evaluation after the fact. The usecase "alert when account is logged in" is not natively supported on the platform. People's suggestion is to use integrations.

Microsoft Entra has a (super useful) central sign-in log. Its contents are updated with delay (~5-15 minutes), but most login attempts are logged with rich metadata. This is the only data source you can read about sign-ins, no other system exists. Integrations should integrate with this sign-in log.

### The naive integration

Googling for approaches to integrate with the sign-in log will result in setting up a third party solution that hooks into the sign-in logs. This is an easy approach, with additional cost and the additional risk of sharing sensitive information (the sign-in metadata).  
Alternatively you can setup an integration without third party, setup an Azure subscription, then an Azure log analytics workspace, then configure monitor alerts. This is a more hands-on approach and has additional cost.

I'm not interested in 



---
I publish immediately for peace of mind, and regularly revisit my content to look for opportunities to improve.

**""** - _Bad idea factory_