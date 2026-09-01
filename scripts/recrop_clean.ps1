Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\docs\designs\profil-toko.png"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)

$img = [System.Drawing.Bitmap]::FromFile($sourcePath)
$w = $img.Width
$h = $img.Height
Write-Host "Image size: $w x $h"

$outDir = Join-Path $PSScriptRoot "..\public\aset"

# 1. Precise Crop 3D Isometric House (avoiding any card border dark pixels)
# In 1536x1024:
# House is located around X: 675 to 870, Y: 768 to 965
$houseX = 675
$houseY = 768
$houseW = 195
$houseH = 190
$houseRect = New-Object System.Drawing.Rectangle($houseX, $houseY, $houseW, $houseH)
$houseBmp = $img.Clone($houseRect, $img.PixelFormat)
$houseBmp.Save((Join-Path $outDir "isometric-house.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$houseBmp.Dispose()
Write-Host "3D House saved cleanly."

# 2. Precise Crop 3D Chat & Plant (avoiding any card border dark pixels)
# Chat & plant is located around X: 1285 to 1485, Y: 760 to 965
$chatX = 1285
$chatY = 760
$chatW = 190
$chatH = 200
$chatRect = New-Object System.Drawing.Rectangle($chatX, $chatY, $chatW, $chatH)
$chatBmp = $img.Clone($chatRect, $img.PixelFormat)
$chatBmp.Save((Join-Path $outDir "chat-plant.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$chatBmp.Dispose()
Write-Host "3D Chat & Plant saved cleanly."

$img.Dispose()
Write-Host "Done!"
