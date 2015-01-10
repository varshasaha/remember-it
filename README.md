# remember-it
A Post-It app.

The app is made with a heirarchial structure with __Core__ at the base, __Sandbox__ on top of it and other modules interacting via __Sandbox__ using pub-sub pattern thus becoming independent and unknown to each others' functionality._(loose coupling)_

At the base, __jQuery__ library has been used, but strictly for DOM manipulations, rest of the app is oblivious to this fact and is written in **Object Oriented JavaScript** with sensical use of patterns such as:
 - Module
 - Revealing Module
 - Constructor
 - Singleton
 - Observer
