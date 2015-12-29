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

There are two ways to fix this. One way is to modify the binary with a hex editor. Another way is to automatically enter the registry string into the registry before running the program.


####Modify Volume ID v2.0 Binary<br>


When you run volumeid.exe it first asks you to accept the license agreement.<br>
If you are going to use it, then of course you "agree" with it.<br>

Here's the problem. When you run it, it adds registry crap, specifically:<br>
`HKCU\Software\Sysinternals`   ... whether or not you accept the license.

Let's fix that crap... and make it portable, and smaller...<br>


First, run `delcert` to strip off the digital certificate.<br>
You can find `delcert` here (or in the `delcert` folder: <br>
http://forum.xda-developers.com/showthread.php?p=2508061#post2508061

The reason you need to strip off the certificate is that once you start hex editing the binary, the certificate will become invalid. Stripping off the digital certificate also makes the binary smaller.


Use your hex editor and search for the following:

`81 EC 10 01 00 00` <br>

We'll be using two opcodes to fix the binary<br>
`C3` means `RETN` or Return from procedure<br>
`90` means `NOP` or No Operation


`81 EC 10 01 00 00` <br>
CREATES UNNEEDED ORPHAN CODE (THE REGISTRY READ/WRITE STUFF)<br>
TO CREATE AND THEN CLEAR THE ORPHAN CODE...<br>

FIND...<br>

`81 EC 10 01 00 00`  `-->` THEN REPLACE WITH<br>
`C3 90 90 90 90 90`  `-->` TO NOP ALL THE WAY TO THE END OF ORPHAN CODE<br>

`81 C4 10 01 00 00 C3 90`  	`-->` IS THE END OF THE ORPHAN CODE...<br>
`90 90 90 90 90 90 90 90`		`-->` NOP IT ALL... IT'S 655 BYTES OF NOPS <br>	

NEXT...<br>

`5C706172207D7D00`		`-->` (BEGINNING OF LICENSE TEXT) CHANGE THIS...<br>
`9090909090909090`		`-->` TO THIS... ALL THE WAY TO THE END OF THE LICENSE TEXT<br>

`6C7D3B7D0000000052`		`-->` CHANGE THIS...  <br>
`909090900000000052`		`-->` TO THIS... (IT'S THE END OF THE LICENSE TEXT) <br>

FOR EDUCATIONAL PURPOSES

####Automatic Registry Edit

There is a two-file fix and a one-file fix.

#####Two-File Fix

Create a batch file called `Volume01.bat` with the following info inside:

    @ECHO OFF
    regedit /s vol_add.reg
    EXIT

Create another file called `vol_add.reg` with the following info inside:

    Windows Registry Editor Version 5.00
    
    [HKEY_CURRENT_USER\Software\Sysinternals]
    
    [HKEY_CURRENT_USER\Software\Sysinternals\VolumeID]
    "EulaAccepted"=dword:00000001

Now, run `Volume01.bat` and it will add the appropriate registry entry to allow you to run `volumeid.exe` without the `VolumeID License Agreement` popup.

#####One-File Fix

Create a batch file called `Volume02.bat` with the following info inside:
```
@ECHO OFF
echo Windows Registry Editor Version 5.00 > vol_add.reg
echo. >>vol_add.reg
echo [HKEY_CURRENT_USER\Software\Sysinternals] >>vol_add.reg
echo. >>vol_add.reg
echo [HKEY_CURRENT_USER\Software\Sysinternals\VolumeID] >>vol_add.reg
echo "EulaAccepted"=dword:00000001 >>vol_add.reg
echo. >>vol_add.reg
ping 127.0.0.1 -n 2 
regedit /s vol_add.reg
ping 127.0.0.1 -n 2 
del /Q vol_add.reg
EXIT
```
The batch file dynamically creates the `vol_add.reg` file, uses ping to create a two-second pause to give time for the file to be created, runs the `vol_add.reg` file, then uses ping to wait another two seconds for the registry to be written to, then deletes the `vol_add.reg` file. 

Now, run `Volume02.bat` and it will add the appropriate registry entry to allow you to run `volumeid.exe` without the `VolumeID License Agreement` popup.
