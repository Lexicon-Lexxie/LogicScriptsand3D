const rotValue = document.getElementById("rot-value");
const meterFill = document.getElementById("meter-fill");
const heroToggle = document.getElementById("hero-toggle");

if (heroToggle && rotValue && meterFill) {
  heroToggle.addEventListener("click", () => {
    const current = Number.parseInt(rotValue.textContent, 10) || 74;
    const next = current >= 94 ? 74 : current + 10;
    rotValue.textContent = `${next}%`;
    meterFill.style.width = `${next}%`;
    heroToggle.textContent = next >= 94 ? "The rot is raging" : "Trigger rot surge";
  });
}

const storyToggles = document.querySelectorAll("[data-story-toggle]");
const stepButtons = document.querySelectorAll(".step-dot");
const progressStatus = document.getElementById("progress-status");
const choiceButtons = document.querySelectorAll(".choice-button");
const choiceResult = document.getElementById("choice-result");
const questTasks = document.querySelectorAll(".quest-task");

storyToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".story-card");
    if (!card) return;
    const isOpen = card.classList.contains("open");
    card.classList.toggle("open", !isOpen);
    const marker = button.querySelector("span:last-child");
    if (marker) {
      marker.textContent = isOpen ? "+" : "−";
    }

    if (!isOpen) {
      const cards = [...document.querySelectorAll(".story-card")];
      const openIndex = cards.findIndex((storyCard) => storyCard.classList.contains("open"));
      const currentIndex = cards.indexOf(card);
      const activeIndex = openIndex >= 0 ? openIndex : currentIndex;
      stepButtons.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex || idx === activeIndex);
      });
    }
  });
});

stepButtons.forEach((stepButton) => {
  stepButton.addEventListener("click", () => {
    const index = Number(stepButton.dataset.step);
    const cards = [...document.querySelectorAll(".story-card")];

    cards.forEach((card, cardIndex) => {
      const shouldOpen = cardIndex === index;
      card.classList.toggle("open", shouldOpen);
      const toggle = card.querySelector(".story-toggle");
      const marker = toggle ? toggle.querySelector("span:last-child") : null;
      if (marker) {
        marker.textContent = shouldOpen ? "−" : "+";
      }
    });

    stepButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    progressStatus.textContent = `${index + 1}/4 chapters explored`;
  });
});

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    choiceButtons.forEach((option) => option.classList.remove("active"));
    button.classList.add("active");

    const choice = button.dataset.choice;
    const messages = {
      pantry: "Mr. Clean finds the clue trail in the pantry and learns the rot was feeding on old leftovers.",
      weapon: "He tracks the legendary Arm & Hammer and realizes it is the only force strong enough to fight the rot.",
      fridge: "He charges the fridge head-on, proving that courage alone is not enough without the restoration weapon."
    };

    choiceResult.textContent = messages[choice] || "Mr. Clean chooses the hero path. The kitchen still needs a plan.";
  });
});

questTasks.forEach((task) => {
  task.addEventListener("click", () => {
    task.classList.toggle("complete");
    task.textContent = task.classList.contains("complete")
      ? `${task.textContent} ✓`
      : task.textContent.replace(" ✓", "");
  });
});
