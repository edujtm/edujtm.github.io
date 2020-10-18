---
title: "Android Context - Deep Dive"
date: 2020-10-14
---

## The ubiquity of context

Every developer that has made even the most mininal Android application has touched the Context object in some way or another, even if they don't grasp what is the purpose of it. This vision of Context as some object that you have to pass around everywhere in order to do the things you want to do sometimes persists even after you gather experience with the platform, which is concerning because passing it around recklessly might lead to memory leaks. Knowing about this, lots of experienced Android developers have made articles about the subject, talking about how to use it and warning about its possible misuse.

I've read a fair amount of articles on this topic, but one thing that always bother me is that they never talk about why Context exists and what is its purpose in the whole picture of an Android system. They talk about the application, activity and services context how you shouldn't mix them up, but never why those things have a Context in the first place. This always left me wondering why some tasks need to use Context and others don't? I knew where to use them by practice, but I was never quite sure of the underlying reason. 

The Context documentation doesn't help much either:

```Java
/**
 * Interface to global information about an application environment.  This is
 * an abstract class whose implementation is provided by the Android system.  
 * It allows access to application-specific resources and classes, as well as
 * up-calls for application-level operations such as launching activities,
 * broadcasting and receiving intents, etc.
 */
 public abstract class Context {
    /* lots of code in here */
 }
```
<br />
<p>
The description is very generic, what exactly is the "global information" of the "application environment"? Is it information about other pieces of my application (e.g fragments and services), information about the operating system services or both? It talks about "application-level operations" like launching activities, but am I allowed to launch activities from a Service? The answer was yes until <a href="https://developer.android.com/guide/components/activities/background-starts">Android 10</a> which added several restrictions were added to the process.
</p>

## The Context interface

## Fragments don't need no context

- [ActivityThread.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/a4ddee215e41ea232340c14ef92d6e9f290e5174/core/java/android/app/ActivityThread.java) -> manages execution of the main thread in an application process, scheduling and executing activities, broadcast, and other operations on it as the activity manager requests.

- [ZigoteInit.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/a4ddee215e41ea232340c14ef92d6e9f290e5174/core/java/com/android/internal/os/ZygoteInit.java) -> Startup class for the zygote process

- [Zigote.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/a4ddee215e41ea232340c14ef92d6e9f290e5174/core/java/com/android/internal/os/Zygote.java) -> The actual zygote

- [SystemServer.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/a4ddee215e41ea232340c14ef92d6e9f290e5174/services/java/com/android/server/SystemServer.java) -> First service to be initiated


- [Android boot sequence](https://elinux.org/Android_Zygote_Startup) -> zygote boot process

- [Instrumentation.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/core/java/android/app/Instrumentation.java) -> Base class for implementing application instrumentation code.


