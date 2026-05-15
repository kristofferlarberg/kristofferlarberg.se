#!/usr/bin/env python3

import json
import re

with open('template.html', 'r') as f:
    template = f.read()

with open('data.json', 'r') as f:
    data = json.load(f)

def process_loops(template, data):
    pattern = r'\{\{#each\s+(\w+)\}\}(.*?)\{\{/each\}\}'

    def replace_loop(match):
        array_name = match.group(1)
        loop_template = match.group(2)

        if array_name not in data or not isinstance(data[array_name], list):
            return ''

        rendered_items = []
        for item in data[array_name]:
            enriched = dict(item)
            enriched['type_label'] = item['type'].capitalize()
            enriched['frequency_label'] = item['frequency'].capitalize()

            item_html = loop_template
            for field, value in enriched.items():
                item_html = item_html.replace(f'{{{{{field}}}}}', str(value))
            rendered_items.append(item_html.lstrip('\n').rstrip())

        return '\n'.join(rendered_items)

    return re.sub(pattern, replace_loop, template, flags=re.DOTALL)

def replace_variables(template, data):
    pattern = r'\{\{([^#/}]+)\}\}'

    def replace_var(match):
        path = match.group(1).strip()
        keys = path.split('.')
        value = data
        for key in keys:
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                return match.group(0)
        return str(value)

    return re.sub(pattern, replace_var, template)

html = process_loops(template, data)
html = replace_variables(html, data)

generated_comment = '<!-- This file is auto-generated. Edit template.html and data.json instead. -->\n'

with open('index.html', 'w') as f:
    f.write(generated_comment + html)

print("index.html built successfully.")
