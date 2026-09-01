Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\docs\designs\profil-toko.png"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)

$img = [System.Drawing.Bitmap]::FromFile($sourcePath)
$w = $img.Width
$h = $img.Height
Write-Host "Image size: $w x $h"

$outDir = Join-Path $PSScriptRoot "..\public\aset"

# 1. Precise Crop 3D Isometric House - STRICTLY NO TEXT (Starts after the word "PENGIRIMAN")
# In 1536x1024:
$houseX = 715
$houseY = 770
$houseW = 160
$houseH = 195
$houseRect = New-Object System.Drawing.Rectangle($houseX, $houseY, $houseW, $houseH)
$houseBmp = $img.Clone($houseRect, $img.PixelFormat)
$houseBmp.Save((Join-Path $outDir "isometric-house.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$houseBmp.Dispose()
Write-Host "Clean 3D House saved (no text)."

# 2. Precise Crop 3D Chat & Plant - STRICTLY NO TEXT (Starts after the "Chat" & "->" buttons)
# In 1536x1024:
$chatX = 1320
$chatY = 760
$chatW = 165
$chatH = 200
$chatRect = New-Object System.Drawing.Rectangle($chatX, $chatY, $chatW, $chatH)
$chatBmp = $img.Clone($chatRect, $img.PixelFormat)
$chatBmp.Save((Join-Path $outDir "chat-plant.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$chatBmp.Dispose()
Write-Host "Clean 3D Chat & Plant saved (no text)."

$img.Dispose()
Write-Host "Done!"
