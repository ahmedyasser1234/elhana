import urllib.request
import json
import os

dest_dir = r'C:\Users\omega\Downloads\elhana-main\elhana\public\images\destinations'
os.makedirs(dest_dir, exist_ok=True)

titles_map = {
    'naama-bay.jpg': 'File:Naama_Bay_Beach_R01.jpg',
    'ras-mohammed.jpg': 'File:Ras_Mohammad_Beach.jpg',
    'tiran-island.jpg': 'File:Tiran_R01.jpg',
    'nabq-bay.jpg': 'File:Avicennia_marina_-_Nabq_by_Hatem_Moushir_15.JPG',
    'hadaba-ras-um-sid.jpg': 'File:Gold_Beach_at_Ras_Um_Sid_Bay.jpg'
}

url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=' + '|'.join(titles_map.values())
req = urllib.request.Request(url, headers={'User-Agent': 'ElHanaTravel/1.0 (admin@elahanasafari.com)'})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    pages = data.get('query', {}).get('pages', {})
    
    # Invert mapping
    inv_map = {v.replace('_', ' '): k for k, v in titles_map.items()}
    
    for pid, p in pages.items():
        title = p.get('title')
        info = p.get('imageinfo', [{}])[0]
        img_url = info.get('url')
        print(f"Checking {title}: {img_url}")
        
        target_name = inv_map.get(title)
        if not target_name:
            for k, v in titles_map.items():
                if v.lower() in title.lower() or title.lower() in v.lower():
                    target_name = k
                    break
        
        if target_name and img_url:
            out_path = os.path.join(dest_dir, target_name)
            print(f"Downloading {title} -> {out_path}")
            dl_req = urllib.request.Request(img_url, headers={'User-Agent': 'ElHanaTravel/1.0 (admin@elahanasafari.com)'})
            with urllib.request.urlopen(dl_req) as dl_resp, open(out_path, 'wb') as f:
                f.write(dl_resp.read())
            print(f"Saved {target_name} ({os.path.getsize(out_path)} bytes)")

print("Done downloading!")
