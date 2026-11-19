export function updateSetupRedirect(rules, slug, target) {
  const path = `/releases/${slug}/setup.exe`;
  const lines = rules.trimEnd().split(/\r?\n/);
  const matches = lines.filter(line => line.trim().split(/\s+/, 1)[0] === path);
  if (matches.length !== 1) throw new Error(`Expected one Setup redirect for ${slug}.`);
  lines[lines.indexOf(matches[0])] = `${path} ${target} 302`;
  return lines.join('\n') + '\n';
}
