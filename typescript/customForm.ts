interface Field {
  [key: string]:
    | string
    | [string, string]
    | [boolean, "checkbox"]
    | [string, "color"];
}

function createForm(
  fields: Field,
  onSubmit:
    | ((formData: { [key: string]: string | boolean }) => void)
    | [string, (formData: { [key: string]: string | boolean }) => void],
  onSecondary?: ((() => void) | [string, () => void]) | null
): void {
  const form = document.createElement("form");
  form.classList.add("dynamic-form");

  const backdrop = document.createElement("div");
  backdrop.classList.add("form-backdrop");

  const removeForm = () => {
    form.remove();
    backdrop.remove();
  };

  backdrop.addEventListener("click", removeForm);

  for (const [key, value] of Object.entries(fields)) {
    const container = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;

    const input = document.createElement("input");
    if (Array.isArray(value)) {
      input.type = value[1];
      input.value = value[0].toString();
    } else {
      input.type = "text";
      input.value = value as string;
    }

    input.name = key;
    container.appendChild(label);
    container.appendChild(input);
    form.appendChild(container);
  }

  const buttonContainer = document.createElement("div");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";
  cancelButton.type = "button";
  cancelButton.addEventListener("click", removeForm);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = Array.isArray(onSubmit)
    ? onSubmit[0]
    : "Save Changes";

  if (onSecondary) {
    const secondaryButton = document.createElement("button");
    secondaryButton.classList.add("secondary-button");
    secondaryButton.type = "button";

    if (Array.isArray(onSecondary)) {
      secondaryButton.textContent = onSecondary[0];
      secondaryButton.addEventListener("click", () => {
        (onSecondary[1] as () => void)();
        removeForm();
      });
    } else {
      secondaryButton.textContent = "Secondary";
      secondaryButton.addEventListener("click", () => {
        (onSecondary as () => void)();
        removeForm();
      });
    }
    buttonContainer.appendChild(secondaryButton);
  }

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  form.appendChild(buttonContainer);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData: { [key: string]: string | boolean } = {};
    for (const [key] of Object.entries(fields)) {
      const input = form.querySelector(
        `input[name="${key}"]`
      ) as HTMLInputElement;
      if (input && input.type === "checkbox") {
        formData[key] = input.checked;
      } else {
        formData[key] = input.value;
      }
    }

    if (Array.isArray(onSubmit)) {
      onSubmit[1](formData);
    } else {
      onSubmit(formData);
    }
    removeForm();
  });

  document.body.appendChild(backdrop);
  document.body.appendChild(form);
}
