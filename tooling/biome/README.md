# @repo/biome-config

Shared Biome configuration for the monorepo.

## Usage

### Base Configuration

For standard web apps:

```json
{
  "extends": ["@repo/biome-config"]
}
```

### Mobile Configuration

For React Native/Expo apps:

```json
{
  "extends": ["@repo/biome-config/mobile"]
}
```

### Web Configuration

Explicit web configuration (same as base):

```json
{
  "extends": ["@repo/biome-config/web"]
}
```

## Available Configurations

- `@repo/biome-config` - Base configuration
- `@repo/biome-config/mobile` - Mobile-specific (wider lines, console allowed)
- `@repo/biome-config/web` - Web-specific (inherits base)

## Customization

Apps can override any settings by adding them after the extends:

```json
{
  "extends": ["@repo/biome-config"],
  "formatter": {
    "lineWidth": 120
  }
}
```
