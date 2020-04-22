# WLED-API-Tester

For quick-testing WLED-API-Strings.
Maybe a base for the future, to have a common place to find&share API-effects.

It comes shipped with:

- jquery
- WLED custom-icon-font

And has no external deps.

## Features

- Searchbar [Livesearch all effects]
- Run effect on Stripe (Click on EffectName)
- Show ActiveState of running effect (incl. countdown)
  - If there is an effect currently running, the first click stops the current countdown. 2nd click starts a new countdown
- Quickly change effect-settings (click on the chevron)
  - Toggle if URL should include Paramenter (click on the icon)
  - Change Values (input next to icons)
- DEV-Mode (read below how to acces)
  - Use Template + SaveButton to create new effects
  - You cant use the same effectName multiple times
  - You can remove effects using the delete button
  - When you're done, use the export button

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
