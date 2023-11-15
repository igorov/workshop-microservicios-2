# customer-bff

## Información

### Versión

1.0.0

### Descripción

API para consulta de customers

### Autor

Igorov

## Compilación

```bash
npm run build
```

## Ejecución

```bash
npm run start
```

## Ejecución en entorno local

```bash
npm run dev
```

## Ejecución de pruebas unitarias

```bash
npm run test
```

Revisar el reporte de pruebas unitarias generadas en:

> test-result/test-report.html

## Endpoints de estado de salud

**Liveness:** Implementado por defecto en la URL:

> localhost:8080/liveness

**Readiness:** Implementar en index.ts, elemento "readinessProbes".

> localhost:8080/readiness