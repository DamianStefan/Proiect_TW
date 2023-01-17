const LocalStorage = {};

LocalStorage.get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
LocalStorage.set = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
LocalStorage.remove = (key) => {
  return localStorage.removeItem(key);
};

LocalStorage.getUser = () => {
  return LocalStorage.get("user");
};

LocalStorage.setUser = (value) => {
  LocalStorage.set("user", value);
};

LocalStorage.rmUser = () => {
  LocalStorage.remove("user");
};

LocalStorage.getUsers = () => {
  return LocalStorage.get("users");
};
LocalStorage.setUsers = (value) => {
  LocalStorage.set("users", value);
};
LocalStorage.getProjects = () => {
  return LocalStorage.get("projects");
};

LocalStorage.setProjects = (value) => {
  LocalStorage.set("projects", value);
};

LocalStorage.rmProjects = () => {
  LocalStorage.remove("projects");
};

LocalStorage.getProjectById = (id) => {
  const projects = LocalStorage.getProjects();
  projects.map((project) => {
    if (project.idProject === id) {
      console.log(project);
      return project;
    }
  });
};

export default LocalStorage;
