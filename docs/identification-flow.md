# Pestech – Pest Identification Flow

## Proposed User Journey

1. User selects the affected crop.
2. User selects the visible symptoms or damage.
3. User can optionally select where the damage appears:
   - Leaves
   - Stems
   - Roots
   - Fruit
4. The system compares the user's selections against the pest data.
5. The system displays possible pest matches.
6. The user selects a possible pest to view more information.

## Pest Information

Each pest could contain:

- Pest name
- Pest type
- Affected crops
- Symptoms and damage
- Damage location
- Identifying features
- Prevention and responsible control
- Image
- Source

## Important Design Decision

Pest Tech should display **possible pest matches** rather than claiming to provide a definite diagnosis.

## Proposed Identification Flow

Choose Crop → Choose Symptoms/Damage → Damage Location (Optional) → Possible Pest Matches → Pest Details
