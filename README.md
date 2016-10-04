## GoComics Squelcher
For use with Greasemonkey. Hides comments matching a regular expressesion or posted by a user from a list, either of which you may define. Change the two URLs in the script to point to your definitions.

## Formatting
regex.txt should look something like:
```
this_is_spam|this_is_also_spam|lame_comment_p[a4]ttern_1
```
The regex uses the 'i' option by default.

ignored_users.txt should be URI encoded and comma-separated. A convenient way to do this is Firefox's javascript scratchpad:
```javascript
encodeURIComponent("üsername")
```
Then select "Display".

## Usage
The script saves the downloaded definitions. You can comment out the invocation of seedLists() to avoid downloading them again.
