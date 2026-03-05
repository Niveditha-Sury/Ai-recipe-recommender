(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/components/AccountPersonalizationCard.jsx
  var import_fi = __require("react-icons/fi");
  function AccountPersonalizationCard({
    user,
    updateUser,
    editMode,
    toggleEdit,
    newAllergy,
    setNewAllergy,
    newDislike,
    setNewDislike,
    handleAddTag,
    handleRemoveTag,
    hideEditToggle
  }) {
    return /* @__PURE__ */ React.createElement("div", { className: "card slide-up stagger-2 rounded-[20px] p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "serif text-[22px] font-black text-brand-primary mb-5" }, "Personalization"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-2 border-b border-brand-primary/10 last:border-0" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-semibold text-brand-primary/80 mr-4" }, "Age"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, !editMode.age ? /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-brand-primary" }, user.age || "Not set") : /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        className: "input-field w-24 px-3 py-1.5 rounded-lg text-sm text-brand-primary bg-brand-card border border-brand-accent outline-none text-right",
        placeholder: "Age",
        value: user.age || "",
        onChange: (e) => updateUser({ age: e.target.value })
      }
    ), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1",
        onClick: () => toggleEdit("age"),
        title: editMode.age ? "Save" : "Edit"
      },
      editMode.age ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-2 border-b border-brand-primary/10 last:border-0" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-semibold text-brand-primary/80 mr-4" }, "Cooking Experience"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, !editMode.experience ? /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-brand-primary capitalize" }, user.experience || "Not set") : /* @__PURE__ */ React.createElement(
      "select",
      {
        className: "input-field px-3 py-1.5 rounded-lg text-sm text-brand-primary bg-brand-card border border-brand-accent outline-none",
        value: user.experience || "",
        onChange: (e) => updateUser({ experience: e.target.value })
      },
      /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select level"),
      /* @__PURE__ */ React.createElement("option", { value: "beginner" }, "Beginner"),
      /* @__PURE__ */ React.createElement("option", { value: "intermediate" }, "Intermediate"),
      /* @__PURE__ */ React.createElement("option", { value: "advanced" }, "Advanced"),
      /* @__PURE__ */ React.createElement("option", { value: "pro" }, "Professional")
    ), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1",
        onClick: () => toggleEdit("experience"),
        title: editMode.experience ? "Save" : "Edit"
      },
      editMode.experience ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex sm:items-center justify-between py-2 border-b border-brand-primary/10 last:border-0 flex-col sm:flex-row gap-2 sm:gap-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between sm:justify-start w-full sm:w-auto" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-semibold text-brand-primary/80 mr-4" }, "Allergies"), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1 sm:hidden",
        onClick: () => toggleEdit("allergies"),
        title: editMode.allergies ? "Save" : "Edit"
      },
      editMode.allergies ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:items-end gap-2 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-start sm:justify-end w-full" }, editMode.allergies && /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input-field w-full sm:max-w-[180px] px-3 py-1.5 rounded-lg text-sm text-brand-primary bg-brand-card border border-brand-accent outline-none",
        placeholder: "Press Enter to add",
        value: newAllergy,
        onChange: (e) => setNewAllergy(e.target.value),
        onKeyDown: (e) => handleAddTag(
          e,
          "allergies",
          newAllergy,
          setNewAllergy
        )
      }
    ), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1 hidden sm:block",
        onClick: () => toggleEdit("allergies"),
        title: editMode.allergies ? "Save" : "Edit"
      },
      editMode.allergies ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 justify-start sm:justify-end" }, !editMode.allergies && (!user.allergies || user.allergies.length === 0) && /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-brand-primary/50" }, "None"), (user.allergies || []).map((t) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: t,
        className: "tag text-[14px]! flex items-center gap-1 bg-red-100 text-red-800 border-red-200"
      },
      t,
      /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "bg-none border-none cursor-pointer p-0 flex items-center justify-center hover:text-red-500 transition-colors",
          onClick: (e) => {
            e.stopPropagation();
            handleRemoveTag("allergies", t);
          }
        },
        /* @__PURE__ */ React.createElement(import_fi.FiX, null)
      )
    ))))), /* @__PURE__ */ React.createElement("div", { className: "flex sm:items-center justify-between py-2 border-b border-brand-primary/10 last:border-0 flex-col sm:flex-row gap-2 sm:gap-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between sm:justify-start w-full sm:w-auto" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-semibold text-brand-primary/80 mr-4" }, "Never Show Me"), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1 sm:hidden",
        onClick: () => toggleEdit("neverShowMe"),
        title: editMode.neverShowMe ? "Save" : "Edit"
      },
      editMode.neverShowMe ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:items-end gap-2 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-start sm:justify-end w-full" }, editMode.neverShowMe && /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input-field w-full sm:max-w-[180px] px-3 py-1.5 rounded-lg text-sm text-brand-primary bg-brand-card border border-brand-accent outline-none",
        placeholder: "Press Enter to add",
        value: newDislike,
        onChange: (e) => setNewDislike(e.target.value),
        onKeyDown: (e) => handleAddTag(
          e,
          "neverShowMe",
          newDislike,
          setNewDislike
        )
      }
    ), !hideEditToggle && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "text-brand-primary/50 hover:text-brand-secondary transition-colors ml-1 hidden sm:block",
        onClick: () => toggleEdit("neverShowMe"),
        title: editMode.neverShowMe ? "Save" : "Edit"
      },
      editMode.neverShowMe ? /* @__PURE__ */ React.createElement(import_fi.FiCheck, { size: 18 }) : /* @__PURE__ */ React.createElement(import_fi.FiEdit2, { size: 16 })
    )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 justify-start sm:justify-end" }, !editMode.neverShowMe && (!user.neverShowMe || user.neverShowMe.length === 0) && /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-brand-primary/50" }, "None"), (user.neverShowMe || []).map((t) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: t,
        className: "tag !text-[14px] flex items-center gap-1 bg-red-100 text-red-800 border-red-200"
      },
      t,
      editMode.neverShowMe && /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "bg-none border-none cursor-pointer p-0 flex items-center justify-center hover:text-red-500 transition-colors",
          onClick: (e) => {
            e.stopPropagation();
            handleRemoveTag(
              "neverShowMe",
              t
            );
          }
        },
        /* @__PURE__ */ React.createElement(import_fi.FiX, null)
      )
    )))))));
  }
})();
