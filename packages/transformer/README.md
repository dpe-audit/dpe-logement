# @open-dpe-logement/transformer

Package pour la transformation des données du Diagnostic de Performance Energétique (DPE) entre le modèle de données de l'[Observatoire DPE Audit](https://gitlab.com/observatoire-dpe/observatoire-dpe/-/raw/master/modele_donnee/modele_commun_DPE_audit.xsd) et le modèle de données Open DPE.

## Usages

```typescript
type ObservatoireDPESchema = {}
type OpenDPESchema = {}

export function transform(data: ObservatoireDPESchema): OpenDPESchema;
export function transform(data: OpenDPESchema): ObservatoireDPESchema;
export function transform(
  data: ObservatoireDPESchema | OpenDPESchema
): ObservatoireDPESchema | OpenDPESchema {
  // Implementation of the transformation logic goes here
  // This is a placeholder and should be replaced with actual logic
  return data as ObservatoireDPESchema | OpenDPESchema;
}
```
