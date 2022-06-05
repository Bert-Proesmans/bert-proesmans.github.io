+++
title = "*PLING* You've got SPAMmed!"
description = "It's not them, it's you"

date = 2022-06-05T11:00:00Z
updated = 2022-06-05

[taxonomies]
categories = ["Reply"]
tags = ["SPAM", "Notifications"]
+++

Today 400 thousand people with Github accounts received multiple notifications about an discussion around [a Pull Request (PR)](https://github.com/EpicGames/Signup/pull/24). I'm one of them... <!-- more -->

# What happened?

![Github notification e-mails](/2022-06-05-github_notifications.png)

> Myself, and about 400k others, got about 168 e-mails. These e-mails all imply the existence of an *ahem* issue.

# How?

Github is a platform for hosting and collaborating on code. It's one of, if not #1, the more popular platforms to do so.  
On this platform it's possible to organize people and intellectual property (IP) in teams. The purpose is to structure data to simplify access controls, but there is a side-effect; aggregation.

Every platform with a social network component has the ability to tag other accounts; the implicit universal standard is to use the at-character (@), followed by the account name. The tag itself is just text, but its existence has some effects (depending on the platform). In almost all cases, the person in question receives a message notification.

Tagging and aggregation combine into a mechanism to tag multiple people, for example;

* @companyname
| Is a non-explicit tag pointing to all accounts within the named organization
* @everyone and @here
| Is a non-explicit tag pointing to accounts, but the exact account selection is implementation defined
* @team-a
| Is a non-explicit tag pointing to all account-members of team A

In the Pull Request there is a tag of a specific team that happened to contain 400k people, so those 400k people get notified.  
So far pretty intuïtive, and nothing bad happened so far.  
But then **THUNDERING HERD**!

# Problem?

> The thundering herd. A group of animals galloping in the same direction. Sometimes because of an attacking predator, sometimes towards something interesting like a water drinking spot.

The herd, in this case, is a subset of those 400k people attracted towards the relevant PR. That sounds thundering already, BUT WAIT! People arrived and started exploring what the notification is all about. The PR in itself contains nothing of substance, something very unprofessional (let's leave it at that), and that became bait! Oh yes, I advise to click the link and read the comments for yourself. Perfect example of bad cooperation.

> Most are memers actually, I'd love to have dissected angry ungrounded messages! DISSAPOINTEEEED lol

For some reason people tend to get mad upon receiving a notification. Extra mad if the topic is unexpected or irrelevant. Now imagine if the topic contained something that offended them personally... OOOH YES! And there are also memers (trolls basically) that found the situation funny, like me.  
Now what do you expect to happen when people start commenting on the PR? ... YES, MORE NOTIFICATIONS! *real thunderstrike*  
Ooh boy, people might be able to resist a handfull of irrelevant notification messages. But 10s-100s of messages, that's something very hard to ignore. Some got tempted and left another comment themselves, adding another notification on top. 

*Ahem* ... the comments increased, notification messages multiplied, and the IT community had a good laugh on a sunday morning..

# Problem!

Now, it's not the first time an incident on this scale happens. Several multinational companies had to solve similar occurences dating as far back to 1990's.  
To be clear; This is functional behaviour, **working as intended**. If there is an actual problem, it's a *people problem*.

A modern average human has multiple means of getting contacted;

* Mailbox for postmail
* (Multiple) e-mail address for electronic mails
* (Multiple) phone numbers for synchronous calls
* (Multiple) account on social media for chat messages

Each recepticle is designed for different types of communication channels. Different subject matters have varying needs in urgency, expected response time, required confirmation on receive, personal or professional context. Some channels are interlinked due to personal preference.  
This is not something foreign. We're a social species and want to receive information, also from people we have not yet connected with.

Some of these recepticles are open to everyone, like our e-mail- and post mailbox. And that's fine, because most of us have an e-mail SPAM filter and postal abuse is very low.  
But it's still OPEN TO EVERYONE, and processing each message becomes inconvenient when that openness is easily abused.

Does that mean the abuser should be blamed for your inconvenience? No, most of the time not because there is no reason to!  
You, user, holds all the power. Crying like a little baby about this topic will hand off that power to the abuser. You have to give the abuser a proverbial kick in the balls, or take your money and move elsewhere.   
When that kick is not an option, you complain to the platform maintainers to solve your issue. Because when it's *possible* to easily abuse, that means the platform/system is bugged and a *structural solution* needs to be applied!  
If even then there is no followup, you move. That company and/or those people are not your partners anymore. There is a limit to how much shit you can handle each day, and less shit provides more quality time.

# Solutions

I list specific solutions below. I feel that some solutions are not really well explained on the internet, basically leading to bad discoverability. Take from this list what you need. Providing a general solution for every specific case is impossible.

## General

### DISCONNECT

A lot of people have their notifications linked to their e-mail, phone, tablet. Disconnect them! Turn it off! Doubly so for a mix of professional and personal stuff; Configure quiet hours on your professional notifications to not get disturbed in your private time.  
Or use two/multiple phones, tablets, e-mail addressess, pc accounts.

The point is to go through your notifications on your own terms. I legit do not care if you send me a WhatsApp/Facebook/Twitter/Reddit/e-mail message, I will respond when I make time to browse the platform. My phone is also on silent except when favourite contacts ring me up.  

Saying the above is easy, each person's circumstances are different and I suggest to change up your way of working. Implementing a behavioural change is tough.  
The point is to take control of those settings, and change up configurations still within your comfort zone. This can easily be a multi-step process, or don't do anything (calculated risk) and wait until abuse rolls in.

## Postmail

### Straight edge

Remove the post mailbox... but that's not always feasible due to governmental policies.

### Clever

Decrease the size of your mailbox so it can (almost) exactly hold the material you expect, nothing more. If it's full, SPAM has no place to be stored

### Human

Lock the front lip of your mailbox with a key. You now have box with two locks, one for your postman, one for yourself. Hand your postman his key.  
*OMG, but I would have to* **gulp** *interact with my postman!*  
Yes, the world turns because of working humans and their interactions. Get on with it.

## E-mail

### Automate

Targetted SPAM can be easily identified. Create folder rules to automatically select and remove SPAM e-mails from your INBOX. Every decent e-mail provider allows setting up mail folder rules.

### Quick administration

Use the facilities provided by your e-mail provider, like "Conversation view"/"Threaded view" or automated SPAM filtering. The point is to not needing to look at hundreds of SPAM e-mails because they are grouped and classified. All you have to do should be "Select All" and click "Delete".

The "conversation view" IS SUCH AN UNDERRATED FEATURE! I cannot believe why e-mail threads aren't used more often.  
It's a literal heaven on earth; Coming back from weeks of vacation and moving 30 e-mails out of your inbox *at once* because the very last e-mail mentioned the words "ISSUE SOLVED".

### Move

Different e-mail providers have their own spam filter implementation and offer different administrative tools. Move to another one if your current provider sucks balls.  
Some people might be risk-averse and stick to what they have in hand, but to me that's like Stockholm + Sunken cost fallacies. You don't owe them anything that's not on contract or in the terms of service. Do a data takeout and move!

### Maniac

There are people who authenticate and/or encrypt their e-mail messages. An authenticated message is digitally signed with a digital signature, most of the time with some form of physical/virtual smartcard. This is an advanced topic however, to much of my sadness.  
A proper setup will allow you to automatically delete, or at least ignore, non-authenticated e-mail.

## Social Media

### Privacy settings

"I don't care about privacy because I have nothing to hide" - Random Person

HAHAHAHAHAHAHAHA, you nitwit! Now you're stuck with random people sending you SPAM every hour.  
Lock those settings down, only allow the people you know and have connected with to contact you. All messages coming from other people are either irrelevant or you setup and advertise another way to contact you (for specific topics)

### The Twitter CHAD

This is a very personal issue to me; Someone I care for has complains about the way Twitter notifications work.  
When you respond to a twitter post, the context of the post you're replying to is copied. Basically like this;

1. Person A posts something
1. Person B likes Person A's post
1. Person C gets to see Person A's post because the like left by Person B
1. Person C responds to Person A's post, given Person B liked it
1. Person D sees Person C's reply-post, and replies to it

The post made by Person D contains tags to Person A, and Person B, and Person C! Depending on the notification settings of all Person accounts, they receive a notification of the latest post.  
Is this default tagging behaviour correct? I honestly cannot say because it depends on the message content. The fact is Twitter tags all, but it also provides the means to pick who to tag!  

Is this an issue with people or the system, then? I personally think it's both. The system provides the means to follow interesting accounts, update your notification and privacy settings, change who to tag in your post.  
Twitter SHOULD update the interface to make tag selection more discoverable, but people SHOULD also tweak their own notification settings!

So my approach is as follows;  

* I **do change who I tag** when replying to a post. 

This annoys me so much, really, but I do it out of unfounded kindness. This is also not a long-term solution, it only hides bad system design in the short term.

![Twitter select who to tag](/2022-06-05-twitter_select_to_tag.png)

> Play a game of "Find out if and how you select who to tag before you post" on Twitter /facepalm


* I have changed my notification settings to only alert me when someone I follow interacts with my stuff.

![Twitter Privacy & Notification settings](/2022-06-05-twitter_settings.png)

> EXPLORE AND CONFIGURE THESE SETTINGS, they are provided for your own well being!

---
I publish immediately for peace of mind. I regularly revisit my content to look for opportunities to improve.

> "I don't care about privacy because I have nothing to hide" - Bad idea factory