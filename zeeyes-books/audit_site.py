import os, re

base = r'C:\Users\ABISH L RITHIN\.gemini\antigravity\scratch\zeeyes-books'
html_files = [f for f in os.listdir(base) if f.endswith('.html')]

print('=== 1. HTML PAGES AUDIT ===')
all_internal_links = []
page_anchors = {}

for hf in sorted(html_files):
    path = os.path.join(base, hf)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # anchors defined
    anchors = set(re.findall(r'id=[\"\']([a-zA-Z0-9\-_]+)[\"\']', content))
    page_anchors[hf] = anchors
    
    # check title
    title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_m.group(1) if title_m else 'MISSING'
    
    # check script tags
    scripts = re.findall(r'<script\s+[^>]*src=[\"\'](.*?)[\"\']', content, re.IGNORECASE)
    
    # check stylesheets
    styles = re.findall(r'<link\s+[^>]*href=[\"\'](.*?)[\"\']', content, re.IGNORECASE)
    missing_styles = [s for s in styles if s.endswith('.css') and not os.path.exists(os.path.join(base, s.replace('/', os.sep)))]
    
    # check img tags
    imgs = re.findall(r'<img\s+[^>]*src=[\"\'](.*?)[\"\']', content, re.IGNORECASE)
    missing_imgs = [img for img in imgs if not os.path.exists(os.path.join(base, img.replace('/', os.sep)))]
    
    # collect hrefs
    hrefs = re.findall(r'href=[\"\'](.*?)[\"\']', content, re.IGNORECASE)
    for hr in hrefs:
        if hr.startswith('http') or hr.startswith('#') or hr.startswith('mailto:') or hr.startswith('tel:'):
            continue
        all_internal_links.append((hf, hr))
    
    print(f'{hf}: Lines={len(content.splitlines())}, Scripts={scripts}, MissingStyles={missing_styles}, MissingImgs={missing_imgs}')

print('\n=== 2. INTERNAL LINKS VERIFICATION ===')
broken_links = []
for source_page, link in all_internal_links:
    target_file = link.split('#')[0]
    target_anchor = link.split('#')[1] if '#' in link else None
    
    if not os.path.exists(os.path.join(base, target_file)):
        broken_links.append((source_page, link, 'File not found'))
    elif target_anchor and target_file in page_anchors:
        if target_anchor not in page_anchors[target_file]:
            broken_links.append((source_page, link, f'Anchor #{target_anchor} not found in {target_file}'))

print(f'Total checked links: {len(all_internal_links)}')
print(f'Broken links: {broken_links}')
print(f'services.html anchors: {page_anchors.get("services.html")}')

print('\n=== 3. JAVASCRIPT FILES AUDIT ===')
js_dir = os.path.join(base, 'js')
js_files = os.listdir(js_dir) if os.path.exists(js_dir) else []
for jf in js_files:
    jpath = os.path.join(js_dir, jf)
    with open(jpath, 'r', encoding='utf-8') as f:
        js_code = f.read()
    print(f'{jf}: Length={len(js_code)} chars, Lines={len(js_code.splitlines())}')
