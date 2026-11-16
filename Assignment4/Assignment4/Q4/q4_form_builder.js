// Q4: Custom Form Builder (Forms + Classes)

class FormBuilder {
  constructor(container, fields) {
    this.container = container;
    // Give every field a "name": use the given one or build it from the label ("Full Name" -> "fullName")
    this.fields = fields.map((field) => ({
      ...field,
      name: field.name || FormBuilder.labelToName(field.label),
    }));
    this.form = null;
  }

  // Converts a label to a camelCase key
  static labelToName(label) {
    return label
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .split(/\s+/)
      .map((word, i) => (i === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()))
      .join("");
  }

  // Escapes text so labels/options cannot break the HTML
  static escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Builds the HTML for one field based on its type
  buildField(field) {
    const label = FormBuilder.escapeHtml(field.label);
    const name = FormBuilder.escapeHtml(field.name);

    if (field.type === "select") {
      const options = (field.options || [])
        .map((opt) => `<option value="${FormBuilder.escapeHtml(opt)}">${FormBuilder.escapeHtml(opt)}</option>`)
        .join("");
      return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${options}</select></div>`;
    }
    if (field.type === "textarea") {
      return `<div class="field"><label for="${name}">${label}</label><textarea id="${name}" name="${name}" rows="3"></textarea></div>`;
    }
    if (field.type === "checkbox") {
      return `<div class="field"><label><input type="checkbox" id="${name}" name="${name}"> ${label}</label></div>`;
    }
    // text, email, password, number, date ...
    return `<div class="field"><label for="${name}">${label}</label><input type="${field.type}" id="${name}" name="${name}"></div>`;
  }

  // Creates the whole form using innerHTML
  render() {
    const fieldsHtml = this.fields.map((field) => this.buildField(field)).join("");
    this.container.innerHTML = `<form id="dynamic-form">${fieldsHtml}<button type="submit">Submit</button></form>`;
    this.form = this.container.querySelector("form");
  }

  // Returns all entered values as an object
  getFormData() {
    const data = {};
    this.fields.forEach((field) => {
      const element = this.form.elements[field.name];
      data[field.name] = field.type === "checkbox" ? element.checked : element.value;
    });
    return data;
  }

  // Runs the callback with the form data when the user clicks Submit
  onSubmit(callback) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      callback(this.getFormData());
    });
  }
}

// ----- Using the FormBuilder -----
const fields = [
  { type: "text", label: "Username" },
  { type: "email", label: "Email" },
  { type: "password", label: "Password" },
  { type: "number", label: "Age" },
  { type: "select", label: "Country", options: ["India", "USA", "UK"] },
  { type: "textarea", label: "About You" },
  { type: "checkbox", label: "Subscribe to newsletter" },
];

const builder = new FormBuilder(document.getElementById("form-container"), fields);
builder.render();
builder.onSubmit((data) => {
  // textContent shows the data safely (no HTML injection)
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  console.log("Form data:", data);
});
