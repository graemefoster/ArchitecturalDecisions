FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Copy everything
COPY ./src ./

# Restore as distinct layers
RUN dotnet restore

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /out ./

ENTRYPOINT ["dotnet", "ArchitectureDecisionsWeb.dll"]
