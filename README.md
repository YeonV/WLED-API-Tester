# WLED-API-Tester

For quick-testing WLED-API-Strings.
Maybe a base for the future, to have a common place to find&share API-effects.

It comes shipped with:

- jquery
- WLED custom-icon-font

And has no other external deps.

Its in a VERY early stage as its just a PoC.

DEV-Mode toggle is the dot inbetween the Versionnumber
(Head line - Between "v0" and "1")

Everything runs in the client browser so at the moment there is no need for a server environment at all.

## Note:

The "effect-list" is only handled in the Browser-Session: (Reload->lose all data)
This way you can experiment, and incase of messing up anything you could just reload.

When you are done and everything runs smooth, you can use the export button at the bottom right.
This will download a new "effects.js"
(replace the one in the root folder)

If this turns out to be useful, we could easily create a server for website+config-part to have a platform to create/share/find API-effects.
