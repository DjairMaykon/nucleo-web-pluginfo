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

function onToggleMenu(closeMenu = false) {
  var checkBox = document.getElementById("toogle-menu-checkbox");

  console.log(checkBox.checked);
  closeMenu && (checkBox.checked = false);

  if (checkBox.checked == false) {
    document.getElementById("page-main").classList.add("hide");
  } else {
    document.getElementById("page-main").classList.remove("hide");
  }
}
