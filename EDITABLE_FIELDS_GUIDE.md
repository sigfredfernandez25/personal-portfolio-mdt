# Portfolio Editable Fields Guide

## 🎯 How to Use the Editing System

1. **Open** `portfolio.html` in any web browser
2. **Click** the "✏️ Edit" button in the top-right corner
3. **Click** any bracketed placeholder like `[Your Email]`
4. **Type** your information
5. **Press Enter** or click outside to save
6. **Click** "❌ Exit Edit" when finished

All changes are **automatically saved** to your browser's localStorage and will persist when you reload the page.

---

## 📋 Complete List of Editable Fields

### **ABOUT ME SECTION** (7 fields)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Full Name | `fullName` | [Your Full Name] |
| Age | `age` | [Your Age] |
| Address | `address` | [Your Address] |
| Email | `email` | [Your Email] |
| Phone | `phone` | [Your Contact Number] |
| Nationality | `nationality` | [Your Nationality] |
| Teaching Philosophy | `teachingPhilosophy` | [Write your teaching philosophy here.] |

---

### **EDUCATION SECTION** (9 fields)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| **Section Description** | `educationDescription` | [Write a brief description about your educational journey.] |

#### College
| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Institution | `collegeInstitution` | [Institution Name] |
| Description | `collegeDescription` | [Short description here.] |

#### Senior High School
| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Institution | `seniorHighInstitution` | [Institution Name] |
| Description | `seniorHighDescription` | [Short description here.] |

#### High School
| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Institution | `highSchoolInstitution` | [Institution Name] |
| Description | `highSchoolDescription` | [Short description here.] |

#### Elementary
| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Institution | `elementaryInstitution` | [Institution Name] |
| Description | `elementaryDescription` | [Short description here.] |

---

### **SKILLS & WORKS SECTION** (8 fields)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| **Section Introduction** | `skillsIntroDescription` | [Brief introduction about your skills and teaching materials.] |

#### Skill Descriptions
| Skill | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Classroom Management | `classroomManagementDesc` | [Brief description here.] |
| Lesson Planning | `lessonPlanningDesc` | [Brief description here.] |
| Instructional Material Design | `materialDesignDesc` | [Brief description here.] |
| Canva | `canvaDesc` | [Brief description here.] |
| Microsoft Office | `microsoftOfficeDesc` | [Brief description here.] |
| Creativity | `creativityDesc` | [Brief description here.] |

---

### **WORKS SECTION** (1 field)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Works Description | `worksDescription` | [A short description of your instructional materials.] |

---

### **CONTACT SECTION** (6 fields)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Contact Description | `contactDescription` | [Write a short message inviting visitors to get in touch.] |
| **Email** | `contactEmail` | [Your Email] |
| **Phone** | `contactPhone` | [Your Phone Number] |
| **Address** | `contactAddress` | [Your Address] |
| Facebook | `facebook` | [Facebook Profile] |
| LinkedIn | `linkedin` | [LinkedIn Profile] |

---

### **FOOTER SECTION** (1 field)

| Field | Data Field Name | Current Placeholder |
|-------|----------------|---------------------|
| Closing Message | `closingMessage` | [Write a short closing message here.] |

---

## 📊 Summary

**Total Editable Fields: 32**

- About Me: 7 fields
- Education: 9 fields (1 intro + 8 details)
- Skills & Works: 8 fields (1 intro + 6 skill descriptions + 1 works description)
- Contact: 6 fields
- Footer: 1 field

---

## 💾 Data Storage

All your data is stored in your browser's **localStorage** under the key `portfolioData`. This means:

✅ **Persists** between page reloads
✅ **No server** required
✅ **Private** to your browser
✅ **Instant** saving

---

## 📤 Export Your Data

**Double-click** the "✏️ Edit" button to export your portfolio data as a JSON file. This creates a backup of all your entered information.

---

## 🔄 Import/Reset Data

To **reset** all fields to defaults:
1. Open browser console (F12)
2. Type: `localStorage.removeItem('portfolioData')`
3. Refresh the page

To **import** data:
1. Edit the exported JSON file
2. Open browser console (F12)
3. Type: `localStorage.setItem('portfolioData', '[paste your JSON here]')`
4. Refresh the page

---

## 🎨 Visual Indicators

- **Dashed outline**: Field is editable (when in edit mode)
- **Solid blue outline**: Field is currently being edited
- **Green "Saved!" indicator**: Your change was saved successfully

---

## ⌨️ Keyboard Shortcuts

- **Enter**: Save and close editing
- **Shift + Enter**: New line (in textarea fields)
- **Escape**: Cancel editing without saving

---

## 💡 Tips

1. **Edit Mode is Safe**: Your portfolio looks normal when not in edit mode
2. **Auto-save**: Don't worry about manually saving - it's automatic
3. **Multi-line Text**: For longer fields like Teaching Philosophy, the system automatically provides a textarea
4. **Browser-specific**: Data is stored per browser, so different browsers won't share the same data
5. **Backup**: Use the export feature regularly to keep a backup of your data

---

## 🚀 Ready to Personalize!

Your portfolio is now ready to be customized with your unique information. Simply click "✏️ Edit" and start filling in your details!
