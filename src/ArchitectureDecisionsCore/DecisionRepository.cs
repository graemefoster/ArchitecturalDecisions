using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ArchitectureDecisionsCore
{
    public class DecisionRepository : IDecisionRepository
    {
        private readonly string _directory;

        public DecisionRepository(string directory)
        {
            _directory = directory;
        }

        public async Task<IList<ReferenceItem<Decision>>> GetDecisions()
        {
            var all = new List<ReferenceItem<Decision>>();
            foreach (var file in Directory.GetFiles(_directory))
            {
                var decision = await FetchDecision(file);
                all.Add(ReferenceItem<Decision>.FromEntity(decision));
            }

            return all;
        }

        private static async Task<Decision> FetchDecision(string file)
        {
            return JsonConvert.DeserializeObject<Decision>(await File.ReadAllTextAsync(file))!;
        }

        public Decision New()
        {
            return new Decision()
            {
                DisplayName = "New Decision",
                SolutionCriteria = new List<Criteria>()
                {
                    new()
                    {
                        Id = 1,
                        Description = "Cost Optimisation",
                        Index = 1,
                    },
                    new()
                    {
                        Id = 2,
                        Description = "Operations",
                        Index = 2,
                    },
                    new()
                    {
                        Id = 3,
                        Description = "Performance",
                        Index = 3,
                    },
                    new()
                    {
                        Id = 4,
                        Description = "Reliability",
                        Index = 4,
                    },
                    new()
                    {
                        Id = 5,
                        Description = "Security",
                        Index = 5,
                    },
                },
                Stakeholders = new List<Stakeholder>()
                {
                    new()
                    {
                        Id = 1,
                        Role = "Security"
                    },
                    new()
                    {
                        Id = 2,
                        Role = "Networks"
                    },
                    new()
                    {
                        Id = 3,
                        Role = "Risk"
                    },
                    new()
                    {
                        Id = 4,
                        Role = "Operations"
                    },
                    new()
                    {
                        Id = 5,
                        Role = "Delivery"
                    },
                },
                Options = new List<Option>()
                {
                    new Option()
                    {
                        Name = "Option 1",
                        Id = 1,
                        Diagram = ""
                    },
                    new Option()
                    {
                        Name = "Option 2",
                        Id = 2,
                        Diagram = ""
                    },
                    new Option()
                    {
                        Name = "Option 3",
                        Id = 3,
                        Diagram = ""
                    },
                }
            }.Sanitise();
        }

        public async Task<Decision> Save(Decision decision)
        {
            decision.Sanitise();
            await File.WriteAllTextAsync(Path.Combine(_directory, decision.Id + ".json"),
                JsonConvert.SerializeObject(decision, Formatting.Indented));
            return decision;
        }

        public async Task<Decision> Get(Guid decisionId)
        {
            var decision = await FetchDecision(Path.Combine(_directory, decisionId + ".json"));
            decision.Sanitise();
            return decision;
        }

        public Task Delete(Guid decisionId)
        {
            var path = Path.Combine(_directory, decisionId + ".json");
            File.Delete(path);
            return Task.CompletedTask;
        }

        public async Task Duplicate(Guid decisionId)
        {
            var decision = await FetchDecision(Path.Combine(_directory, decisionId + ".json"));
            var newId = Guid.NewGuid();
            decision.Id = newId;
            decision.DisplayName = $"Copy of {decision.DisplayName}";
            await Save(decision);
        }
    }
}