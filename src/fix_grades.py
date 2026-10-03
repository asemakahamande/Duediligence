content = open('src/data/youngCodersData.js', 'r', encoding='utf-8').read()

# Fix gradeGroups filter tab
content = content.replace("{ id: '9-14', label: 'Grade 9\u201314', group: 'Grade 9-14', ages: 'Ages 14\u201318+', desc: 'Python Software Engineering & Full-Stack Web Development' },",
                           "{ id: '9-12', label: 'Grade 9\u201312', group: 'Grade 9-12', ages: 'Ages 14\u201318+', desc: 'Python Software Engineering & Full-Stack Web Development' },")

# Fix gradeGroups all label
content = content.replace("ages: 'Grade 1\u201314'", "ages: 'Grade 1\u201312'")

# Fix all course gradeGroup/gradeLevel/ageRange/id fields for grade 9-14
content = content.replace("gradeLevel: 'Grade 9 - 14'", "gradeLevel: 'Grade 9 - 12'")
content = content.replace("gradeGroup: 'Grade 9-14'", "gradeGroup: 'Grade 9-12'")
content = content.replace("ageRange: 'Ages 14 - 18+'", "ageRange: 'Ages 14 - 18+'")  # keep ages as-is

# Fix modernNeed text references
content = content.replace("Grade 9 to 14", "Grade 9 to 12")

open('src/data/youngCodersData.js', 'w', encoding='utf-8').write(content)
print("Done")
