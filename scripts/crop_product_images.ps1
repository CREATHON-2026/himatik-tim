Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\docs\designs\isi-produk.png"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)

$img = [System.Drawing.Bitmap]::FromFile($sourcePath)
$w = $img.Width
$h = $img.Height
Write-Host "Image size: $w x $h"

$outDir = Join-Path $PSScriptRoot "..\public\aset"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

# 1. Crop Main Product Image
# Main image is located on the left side: X: 45 to 760, Y: 155 to 640 (normalized in 1536x1024)
$prodX = [int]($w * 0.038)
$prodY = [int]($h * 0.145)
$prodW = [int]($w * 0.465)
$prodH = [int]($h * 0.485)
$prodRect = New-Object System.Drawing.Rectangle($prodX, $prodY, $prodW, $prodH)
$prodBmp = $img.Clone($prodRect, $img.PixelFormat)
$prodBmp.Save((Join-Path $outDir "produk-soft-lilac.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$prodBmp.Dispose()
Write-Host "Main product image saved."

# 2. Crop 4 Thumbnails
# Thumb 1
$t1X = [int]($w * 0.038)
$t1Y = [int]($h * 0.640)
$t1W = [int]($w * 0.088)
$t1H = [int]($h * 0.110)
$t1Rect = New-Object System.Drawing.Rectangle($t1X, $t1Y, $t1W, $t1H)
$t1Bmp = $img.Clone($t1Rect, $img.PixelFormat)
$t1Bmp.Save((Join-Path $outDir "produk-thumb-1.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$t1Bmp.Dispose()

# Thumb 2
$t2X = [int]($w * 0.133)
$t2Y = [int]($h * 0.640)
$t2W = [int]($w * 0.088)
$t2H = [int]($h * 0.110)
$t2Rect = New-Object System.Drawing.Rectangle($t2X, $t2Y, $t2W, $t2H)
$t2Bmp = $img.Clone($t2Rect, $img.PixelFormat)
$t2Bmp.Save((Join-Path $outDir "produk-thumb-2.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$t2Bmp.Dispose()

# Thumb 3
$t3X = [int]($w * 0.228)
$t3Y = [int]($h * 0.640)
$t3W = [int]($w * 0.088)
$t3H = [int]($h * 0.110)
$t3Rect = New-Object System.Drawing.Rectangle($t3X, $t3Y, $t3W, $t3H)
$t3Bmp = $img.Clone($t3Rect, $img.PixelFormat)
$t3Bmp.Save((Join-Path $outDir "produk-thumb-3.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$t3Bmp.Dispose()

# Thumb 4
$t4X = [int]($w * 0.323)
$t4Y = [int]($h * 0.640)
$t4W = [int]($w * 0.088)
$t4H = [int]($h * 0.110)
$t4Rect = New-Object System.Drawing.Rectangle($t4X, $t4Y, $t4W, $t4H)
$t4Bmp = $img.Clone($t4Rect, $img.PixelFormat)
$t4Bmp.Save((Join-Path $outDir "produk-thumb-4.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$t4Bmp.Dispose()
Write-Host "4 Thumbnails saved."

$img.Dispose()
Write-Host "All product images saved successfully!"
