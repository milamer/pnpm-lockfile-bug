function readPackage(pkg, context) {
  // skip packages that are ours
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

    peerDependencies["@types/react"] = "17 || 18";
  }

  if (pkg.name === "@mdx-js/mdx") {
    context.log(`isReactInUse ${isReactInUse}`);
    context.log(`isTypesReactInUse ${isTypesReactInUse}`);
    context.log(`pkg ${pkg.peerDependencies["@types/react"]}`);
    context.log(JSON.stringify(pkg, null, 2));
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
