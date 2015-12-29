### VolumeID Program Fix

Volumeid.exe is a really good program at changing a hard drive's serial number.

You can find it on the technet website here

https://technet.microsoft.com/en-us/sysinternals/bb897436.aspx



Windows NT/2000/XP/7/8/10 built-in Label utility lets you change the labels of disk volumes; however, it does not provide any means for changing volume ids. This utiltity, VolumeID, allows you to change the ids of FAT and NTFS drives.

Usage: `volumeid <driveletter:> xxxx-xxxx`

This is a command-line program that you must run from a command-prompt window.

Note that changes on NTFS volumes won't be visible until the next reboot.<br> 
In addition, you should shut down any applications you have running before changing a volume id. <br>

### Challenge

When you first run this program, it ask you to accept the license agreement then adds a registry entry showing that you accepted the agreement. This is not explicitly stated on the technet website.

To remedy this, you'll need to modify the binary. You can follow the steps below to see how this is accomplished.


