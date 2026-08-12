#!/usr/bin/env python3
"""
Decode a HEIC/HEIF file to a temporary JPEG.

sharp ships a libheif build without the HEVC decoder plugin, so it can read
HEIC metadata but fails on decode ("Support for this compression format has not
been built in"). pillow-heif decodes correctly, so the image pipeline routes
HEIC through here first and hands sharp an ordinary JPEG.

Usage: heic-to-jpeg.py <source> <destination>
"""
import sys

try:
    import pillow_heif
    from PIL import Image
except ImportError:
    sys.stderr.write(
        'pillow-heif is required to read HEIC files.\n'
        'Install it with: pip install pillow-heif --break-system-packages\n'
    )
    sys.exit(2)

pillow_heif.register_heif_opener()

src, dest = sys.argv[1], sys.argv[2]
image = Image.open(src)
# EXIF orientation is applied here so downstream sizing sees true dimensions.
try:
    from PIL import ImageOps
    image = ImageOps.exif_transpose(image)
except Exception:
    pass
# These arrive at ~24 megapixels. Nothing downstream uses more than 2400px on
# the long edge, so downscaling here removes a large amount of peak memory
# without touching output quality.
MAX_EDGE = 2600
if max(image.size) > MAX_EDGE:
    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)

image.convert('RGB').save(dest, 'JPEG', quality=95, subsampling=0)
print(f'{image.size[0]}x{image.size[1]}')
