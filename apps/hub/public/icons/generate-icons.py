import zlib
import struct
import math
import os

def generate_brand_png(filename, size):
    width = size
    height = size
    cx = width / 2.0
    cy = height / 2.0
    
    # Radii for the 'O' ring
    outer_r = size * 0.32
    thickness = size * 0.06
    inner_r = outer_r - thickness
    
    # Helper to build chunks
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data))
        
    png = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png += chunk(b'IHDR', ihdr_data)
    
    # Raw pixel data (RGB)
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # Filter byte (None)
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx*dx + dy*dy)
            
            # Base background color: #09090b (9, 9, 11)
            r, g, b = 9, 9, 11
            
            # If within the ring, render neon gradient
            if inner_r <= dist <= outer_r:
                # Calculate angle for gradient (0 to 1)
                angle = (math.atan2(dy, dx) + math.pi) / (2.0 * math.pi)
                
                # Neon Gradient: #38bdf8 (56, 189, 248) -> #818cf8 (129, 140, 248) -> #ec4899 (236, 72, 153)
                if angle < 0.5:
                    t = angle / 0.5
                    r = int(56 + (129 - 56) * t)
                    g = int(189 + (140 - 189) * t)
                    b = int(248 + (248 - 248) * t)
                else:
                    t = (angle - 0.5) / 0.5
                    r = int(129 + (236 - 129) * t)
                    g = int(140 + (72 - 140) * t)
                    b = int(248 + (153 - 248) * t)
            
            raw_data.append(r)
            raw_data.append(g)
            raw_data.append(b)
            
    png += chunk(b'IDAT', zlib.compress(raw_data))
    png += chunk(b'IEND', b'')
    
    with open(filename, 'wb') as f:
        f.write(png)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    icon_192_path = os.path.join(script_dir, 'icon-192.png')
    icon_512_path = os.path.join(script_dir, 'icon-512.png')
    
    print(f"Generating PWA icons in: {script_dir}")
    generate_brand_png(icon_192_path, 192)
    generate_brand_png(icon_512_path, 512)
    print("PWA icons generated successfully!")
