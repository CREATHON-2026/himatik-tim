Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\docs\designs\profil-toko.png"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)

$img = [System.Drawing.Bitmap]::FromFile($sourcePath)
$w = $img.Width
$h = $img.Height
Write-Host "Image size: $w x $h"

# Create output dir if not exists
$outDir = Join-Path $PSScriptRoot "..\public\aset"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

# 1. Crop Banner
$bannerX = [int]($w * 0.225)
$bannerY = [int]($h * 0.170)
$bannerW = [int]($w * 0.750)
$bannerH = [int]($h * 0.210)
$bannerRect = New-Object System.Drawing.Rectangle($bannerX, $bannerY, $bannerW, $bannerH)
$bannerBmp = $img.Clone($bannerRect, $img.PixelFormat)
$bannerBmp.Save((Join-Path $outDir "profil-banner.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bannerBmp.Dispose()
Write-Host "Banner saved."

# 2. Crop Avatar
$avatarX = [int]($w * 0.248)
$avatarY = [int]($h * 0.305)
$avatarW = [int]($w * 0.103)
$avatarH = [int]($h * 0.155)
$avatarRect = New-Object System.Drawing.Rectangle($avatarX, $avatarY, $avatarW, $avatarH)
$avatarBmp = $img.Clone($avatarRect, $img.PixelFormat)
$avatarBmp.Save((Join-Path $outDir "profil-avatar.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$avatarBmp.Dispose()
Write-Host "Avatar saved."

# 3. Crop 3D Isometric House
$houseX = [int]($w * 0.420)
$houseY = [int]($h * 0.750)
$houseW = [int]($w * 0.155)
$houseH = [int]($h * 0.220)
$houseRect = New-Object System.Drawing.Rectangle($houseX, $houseY, $houseW, $houseH)
$houseBmp = $img.Clone($houseRect, $img.PixelFormat)
$houseBmp.Save((Join-Path $outDir "isometric-house.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$houseBmp.Dispose()
Write-Host "3D House saved."

# 4. Crop 3D Chat & Plant (Full height including pot vase, leaves, bubbles, and background waves)
$chatX = [int]($w * 0.835)
$chatY = [int]($h * 0.750)
$chatW = [int]($w * 0.140)
$chatH = [int]($h * 0.220)
$chatRect = New-Object System.Drawing.Rectangle($chatX, $chatY, $chatW, $chatH)
$chatBmp = $img.Clone($chatRect, $img.PixelFormat)
$chatBmp.Save((Join-Path $outDir "chat-plant.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$chatBmp.Dispose()
Write-Host "3D Chat & Plant saved."

# 5. Crop Floral line-art watermark
$floralX = [int]($w * 0.530)
$floralY = [int]($h * 0.490)
$floralW = [int]($w * 0.120)
$floralH = [int]($h * 0.180)
$floralRect = New-Object System.Drawing.Rectangle($floralX, $floralY, $floralW, $floralH)
$floralBmp = $img.Clone($floralRect, $img.PixelFormat)
$floralBmp.Save((Join-Path $outDir "floral-sketch.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$floralBmp.Dispose()
Write-Host "Floral sketch saved."

$img.Dispose()
Write-Host "All assets successfully extracted with full coverage!"
