export default function dbModel({ storageKey }, compositions) {
  const modelConfig = { storageKey };
  return compositions.reduceRight(
    (model, composition) => ({ ...model, ...composition(modelConfig) }),
    {}
  );
}
