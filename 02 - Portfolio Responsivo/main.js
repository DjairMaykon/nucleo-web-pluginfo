let darkThemeIsOn = window.matchMedia("(prefers-color-scheme: dark)").matches;
onToggleTheme(darkThemeIsOn);

function onToggleTheme(onDarkTheme = false) {
  var checkBox = document.getElementById("toogle-mode-button");

  onDarkTheme && (checkBox.checked = true);

  if (checkBox.checked == true) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function closeMenu() {
  var checkBox = document.getElementById("toogle-menu-checkbox");
  checkBox.checked = false;
}
