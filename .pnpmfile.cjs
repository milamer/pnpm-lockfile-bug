function readPackage(pkg, context) {
  if (pkg.name && pkg.name.startsWith("@test")) return pkg;

  const isReactInUse =
    "react" in pkg.dependencies ||
    "react" in pkg.devDependencies ||
    "react" in pkg.peerDependencies;
  const isTypesReactInUse =
    "@types/react" in pkg.devDependencies ||
    "@types/react" in pkg.peerDependencies ||
    "@types/react" in pkg.dependencies;

  if (isReactInUse || isTypesReactInUse) {
    delete pkg.devDependencies["@types/react"];
    const peerDependencies = pkg.peerDependencies || {};
    pkg.peerDependencies = peerDependencies;

    // TODO: comment in
    // peerDependencies["@types/react"] = "17 || 18";
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
