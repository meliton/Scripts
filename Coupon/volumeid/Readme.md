### VolumeID Program Fix

Volumeid.exe is a really good program at changing a hard drive's serial number.

You can find it on the technet website here

<a href="https://technet.microsoft.com/en-us/sysinternals/bb897436.aspx" target="_blank">Technet Microsoft Sysinternals VolumeID</a>



Windows NT/2000/XP/7/8/10 built-in Label utility lets you change the labels of disk volumes; however, it does not provide any means for changing volume ids. This utiltity, VolumeID, allows you to change the ids of FAT and NTFS drives.

Usage: `volumeid <driveletter:> xxxx-xxxx`

This is a command-line program that you must run from a command-prompt window.

Note that changes on NTFS volumes won't be visible until the next reboot.<br> 
In addition, you should shut down any applications you have running before changing a volume id. <br>

### Challenge

When you first run this program, it ask you to accept the license agreement then adds a registry entry showing that you accepted the agreement. This is not explicitly stated on the technet website.

To remedy this, you'll need to modify the binary with a hex editor. You can follow the steps below to see how this is accomplished.


####Volume ID v2.0 <br>
http://technet.microsoft.com/en-us/sysinternals/bb897436.aspx


When you run volumeid.exe it first asks you to accept the license agreement.<br>
If you are going to use it, then of course you "agree" with it.<br>

Here's the problem. When you run it, it adds registry crap, specifically:<br>
`HKCU\Software\Sysinternals`   ... whether or not you accept the license.

Let's fix that crap... and make it portable, and smaller...<br>


First, run `delcert` to strip off the digital certificate.<br>
You can find `delcert` here: <br>
http://forum.xda-developers.com/showthread.php?p=2508061#post2508061


`81 EC 10 01 00 00` `-->` C3, RETURN FROM FUNCTION RIGHT OFF THE BAT<br>

IT CREATES UNNEEDED ORPHAN CODE (THE REGISTRY READ/WRITE STUFF)<br>
TO CREATE AND THEN CLEAR THE ORPHAN CODE...<br>

FIND...<br>

`81 EC 10 01 00 00`  `-->` REPLACE WITH<br>
`C3 90 90 90 90 90`  `-->` TO NOP ALL THE WAY TO THE END OF ORPHAN CODE<br>

`81 C4 10 01 00 00 C3 90`  	`-->` THE END OF THE ORPHAN CODE...<br>
`90 90 90 90 90 90 90 90`		`-->` NOP IT ALL... IT'S 655 BYTES OF NOPS <br>	

NEXT...<br>

`5C706172207D7D00`		`-->` (BEGINNING OF LICENSE TEXT) CHANGE THIS...<br>
`9090909090909090`		`-->` TO THIS... ALL THE WAY TO THE END OF THE LICENSE TEXT<br>

`6C7D3B7D0000000052`		`-->` CHANGE THIS...  <br>
`909090900000000052`		`-->` TO THIS... (IT'S THE END OF THE LICENSE TEXT) <br>

FOR EDUCATIONAL PURPOSES


