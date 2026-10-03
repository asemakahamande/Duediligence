import re

content = open('src/data/youngCodersData.js', 'r', encoding='utf-8').read()

AMPERSAND = chr(38)

courses_to_update = {
    'scratch-coding': {
        'pathEmoji': chr(0x1F7E2),
        'pathLabel': 'Path 1 \u2014 Young Coders',
        'careerRoles': ['Junior Game Designer', 'Creative Coder', 'Digital Storyteller', 'App Prototype Developer'],
        'projects': ['My Animated Story', 'Dancing Character', 'Catch the Apple', 'Maze Game', 'Interactive Quiz', 'Simple Adventure Game'],
        'endResult': 'The child can create their own simple animations and games.',
    },
    'thunkable-apps': {
        'pathEmoji': chr(0x1F535),
        'pathLabel': 'Path 2 \u2014 Game ' + AMPERSAND + ' App Creators',
        'careerRoles': ['Mobile App Developer', 'UI/UX Designer', 'Product Designer', 'App Entrepreneur'],
        'projects': ['Platform Game', 'Math Challenge Game', 'Quiz Game', 'Calculator App', 'Flashcard App', 'To-Do App', 'Drawing App'],
        'endResult': 'The child can build games and simple mobile applications.',
    },
    'robotics-iot-kids': {
        'pathEmoji': chr(0x1F535),
        'pathLabel': 'Path 2 \u2014 Game ' + AMPERSAND + ' App Creators',
        'careerRoles': ['IoT Engineer', 'Robotics Developer', 'Hardware Programmer', 'Embedded Systems Engineer'],
        'projects': ['Smart Light Sensor', 'Digital Thermometer', 'Wireless Message Sender', 'Motion Alarm System', 'Musical Tone Generator', 'Smart Home Gadget'],
        'endResult': 'The child can program physical hardware and build smart sensor gadgets.',
    },
    'roblox-game-dev': {
        'pathEmoji': chr(0x1F7E0),
        'pathLabel': 'Path 3 \u2014 Web ' + AMPERSAND + ' App Developer',
        'careerRoles': ['3D Game Developer', 'Lua Scripter', 'Game Level Designer', 'Indie Game Creator'],
        'projects': ['3D Obstacle Course (Obby)', 'Multiplayer Lava Floor Game', 'Roblox RPG Adventure Map', 'Custom Leaderboard Game', 'Speed Boost Race Track', 'Roblox Tycoon Starter'],
        'endResult': 'The student can design and publish 3D multiplayer Roblox games.',
    },
    'ai-machine-learning-kids': {
        'pathEmoji': chr(0x1F7E0),
        'pathLabel': 'Path 3 \u2014 Web ' + AMPERSAND + ' App Developer',
        'careerRoles': ['AI Engineer', 'Data Scientist', 'ML Researcher', 'AI Product Designer'],
        'projects': ['Gesture-Controlled Game', 'Smart Voice Assistant', 'Image Classifier App', 'AI Story Generator', 'Sound Recognition Tool', 'AI Chatbot'],
        'endResult': 'The student can train AI models and build smart interactive applications.',
    },
    'web-dev-young-coders': {
        'pathEmoji': chr(0x1F534),
        'pathLabel': 'Path 4 \u2014 Python, AI ' + AMPERSAND + ' Machine Learning',
        'careerRoles': ['Frontend Developer', 'Web Designer', 'Full-Stack Developer', 'UI Engineer'],
        'projects': ['Personal Website', 'Portfolio Website', 'School Website', 'Restaurant Website', 'Calculator', 'Quiz Website', 'To-Do App', 'Weather App', 'Student Grade App'],
        'endResult': 'The student can create websites, interactive web applications and simple mobile apps.',
    },
    'python-young-coders': {
        'pathEmoji': chr(0x1F534),
        'pathLabel': 'Path 4 \u2014 Python, AI ' + AMPERSAND + ' Machine Learning',
        'careerRoles': ['Python Developer', 'Backend Engineer', 'AI/ML Engineer', 'Data Analyst'],
        'projects': ['Calculator', 'ATM System', 'Student Management System', 'Library Management System', 'Data Analysis Project', 'House Price Predictor', 'Spam Detector', 'Recommendation System', 'AI Chatbot', 'AI Image Classifier', 'AI Study Assistant', 'Final AI Capstone'],
        'endResult': 'The student can build Python apps, analyse data, and develop AI-powered applications.',
    },
}

def make_injection(data):
    lines = []
    lines.append("    pathEmoji: '" + data['pathEmoji'] + "',")
    lines.append("    pathLabel: '" + data['pathLabel'] + "',")
    return '\n'.join(lines)

def make_tail(data):
    cr_parts = ["'" + r + "'" for r in data['careerRoles']]
    proj_parts = ["      '" + p + "'," for p in data['projects']]
    proj_arr = '[\n' + '\n'.join(proj_parts) + '\n    ]'
    lines = []
    lines.append('    careerRoles: [' + ', '.join(cr_parts) + '],')
    lines.append('    projects: ' + proj_arr + ',')
    lines.append("    endResult: '" + data['endResult'] + "',")
    return '\n'.join(lines)

new_content = content

for course_id in courses_to_update:
    data = courses_to_update[course_id]
    id_pattern = "id: '" + course_id + "'"
    idx = new_content.find(id_pattern)
    if idx == -1:
        print('NOT FOUND: ' + course_id)
        continue

    age_pattern = "    ageRange: '"
    age_idx = new_content.find(age_pattern, idx)
    age_end = new_content.index('\n', age_idx) + 1
    injection = make_injection(data)
    new_content = new_content[:age_end] + injection + '\n' + new_content[age_end:]

    tools_idx = new_content.find('    tools: [', age_idx)
    bracket_end = new_content.index(']', tools_idx + len('    tools: [')) + 1
    line_end = new_content.index('\n', bracket_end) + 1
    tail = make_tail(data)
    new_content = new_content[:line_end] + tail + '\n' + new_content[line_end:]

    print('Updated: ' + course_id)

open('src/data/youngCodersData.js', 'w', encoding='utf-8').write(new_content)
print('Done. Lines: ' + str(len(new_content.split('\n'))))
