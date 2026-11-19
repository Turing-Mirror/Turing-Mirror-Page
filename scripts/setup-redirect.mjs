export function updateSetupRedirect(rules, slug, target) {
  const publicPath = `/releases/${slug}/setup.exe`;
  const artifactPath = `/releases/${slug}/installer.exe`;
  const lines = rules.trimEnd().split(/\r?\n/);
  const pathOf = line => line.trim().split(/\s+/, 1)[0];
  const setupIndex = lines.findIndex(line => pathOf(line) === publicPath);
  if (setupIndex === -1) throw new Error(`Missing Setup redirect for ${slug}.`);

  lines[setupIndex] = `${publicPath} https://cdn.turingmirror.com/d/${slug}-setup 302`;
  const artifact = `${artifactPath} ${target} 302`;
  const artifactIndex = lines.findIndex(line => pathOf(line) === artifactPath);
  if (artifactIndex === -1) lines.splice(setupIndex + 1, 0, artifact);
  else lines[artifactIndex] = artifact;
  return lines.join('\n') + '\n';
}
