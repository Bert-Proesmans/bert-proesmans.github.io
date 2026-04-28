---
title: "How I monitor my emergency account"
description: "ALERT! Break glass to proceed"

date: 2026-04-28
draft: true

tags: ["Microsoft", "Entra", "Security"]
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

I'm not interested in paying more for something I consider an important and basic security need.

### My approach

Luckily there is another first party approach that "only" requires Entra Premium 2 (P2) licenses; Setup custom detection rules (which create an alert) and configure alert notifications in Microsoft Defender (security.microsoft.com).
The setup steps using the defender webportal are provided below. Beware that we're talking about Microsoft and inbetween the time of writing and you following along this flow might have changed.

#### Setup log monitoring

1. Open "Defender - Advanced Hunting" portal page, or [click here](https://security.microsoft.com/v2/advanced-hunting)
1. Type out a query that processes the Sign-In logs, filtered by User Principal Name (UPN) of your emergency account
    * Adjust the UPN to the one assigned to your emergency account
    * This form **only** filters on UPN, use the query result to adjust the filter to your use-case
1. Click the button "Create detection rule"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/advanced-hunting.drawio.svg",
  "alt": "Advanced hunting query editor",
  "caption": "Query that filters the sign-in log for events matching the account identified by emergency@yourdomain"
} %}

4. Fill in details to explain that a sign-in was detected
    * Look at the image below, I'm to lazy to type this all out
4. Click the button "Next"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/custom-detection-general.drawio.svg",
  "alt": "Setup custom detection rule - general information",
  "caption": "Example for metadata to be attached to detection records"
} %}

6. Fill in a recognizable name for your alert, this field accepts placeholders
    * Placeholders will be replaced with values from the corresponding collumn name
6. Verify the entity auto-mapping, this enriches your alert with links and live data
    * The mailbox entity is not relevant to these log records
6. Click the button "Next"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/custom-detection-alert.drawio.svg",
  "alt": "Setup custom detection rule - alert information",
  "caption": "Example for name and entity mapping based on record data"
} %}

9. Optionally configure automatic actions
    * This detection should inform, not act. You do you however
9. Click the button "Next"
9. Click the button "Submit"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/custom-detection-automation.drawio.svg",
  "alt": "Setup custom detection rule - automation information",
  "caption": "No automated action is configured"
} %}

DONE. You now have a custom detection rule that monitors your sign-in log and creates an alert for each detection.

#### Setup alerting

1. Open "Defender - Settings > Microsoft Defender XDR > Email notifications" portal page, or [click here](https://security.microsoft.com/securitysettings/defender/email_notifications)
1. Click the button "Add incident notification rule"
1. Fill information that describes your rule
1. Click the button "Next"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/email-notification-general.drawio.svg",
  "alt": "Setup email notification rule - General information",
  "caption": "Basic information about the rule we're setting up"
} %}

5. Notification settings are optional, but the (alert) source filter is important!
    * Set field "Sources" to include Microsoft Defender XDR > **Custom detection**
    * Set field "Alert severity" to include **High**
        * This filter matches with the metadata of the incident detection rule created in the previous chapter
5. CLick the button "Next"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/email-notification-settings.drawio.svg",
  "alt": "Setup email notification rule - Notification settings",
  "caption": "Filter incident/alert inputs which will trigger an email notification"
} %}

7. Add recipient email addresses
    * After adding at least one address, click the button "Send test e-mail" to verify you can receive alerts without fail
7. Click the button "Next"
7. Click the button "Submit"

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/email-notification-recipients.drawio.svg",
  "alt": "Setup email notification rule - Recipient settings",
  "caption": "Enter email addresses that must receive a notification for incidents/alerts that pass through the filter"
} %}

DONE. You now have automated notifications whenever the incident detection rule outputs a new incident/alert.

{% imageKeys {
  "src": "./src/posts/2026/2026-04-27-monitor-emergency-account/email-notification-example.drawio.svg",
  "alt": "Example email notification",
  "caption": "Great success!"
} %}

#### Refining

Now you'll be notified when sign-in data related to the emergency account is found in your logs.
I kept the example query very simple, a basis for you to build upon. But this exact setup has downsides;

* An interactive sign-in spawns many many log records, you could adjust the query to filter records tagged "interactive"
    * An incident is created for each and all matching entries in the sign-in log
    * Each incident sends a notification email
* _Failed_ sign-in attempts create incidents, allowing bad guys :tm: to perform a succesful login obfuscated inbetween many failed logins
    * OR Adjust the query to filter records tagged "Success"
    * OR Use a more secret username for the emergency account

**!!** The email notifications should be interpreted as a signal to investigate further. In this situation you should ignore any metadata attached to the incident/alert and always do your own **complete** investigation.

---
I publish immediately for peace of mind, and regularly revisit my content to look for opportunities to improve.

**"Let it be, we'll see"** - _Bad idea factory_