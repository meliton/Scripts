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
