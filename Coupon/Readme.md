## The Coupon Challenge


Install virtual machine software
- VMware

Configure VMware to enable virtual printers
- Open VMWare Player
- `Player | File | Preferences ...`
- Enable option Enable Virtual Printers 


Grab a low-memory VM from a legal source... maybe `IE8 on XP` to run in `VMware`...
- <a href="http://modern.ie" target="_blank">modern.ie website</a>

Add the following file and directory to your OS to allow VM installation <br>
-  `C:\vmok\vmok.txt` and the file can be empty


Set up your hard drive to remember (persistent) or forget changes (non-persistent)
** You use only ONE of these lines and at it in your .vmx config **

    ide0:0.mode = "independent-persistent"  
    ide0:0.mode = "independent-nonpersistent"  
    scsi0:0.mode = "independent-persistent"  
    scsi0:0.mode = "independent-nonpersistent"  
	

Also, after every reboot, you'll need to change the registry entry to rename VMWare Drive.
To get around this pesky little road block, open `regedit` and navigate to 
`HKLM\SYSTEM\CurrentControlSet\Services\Disk\Enum`

Change it to something like `Disk_IDE_Hard_Drive`..... <br>
...you can make a regedit to make it work.


