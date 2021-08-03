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
            return new();
        }

        public Task Save(Decision decision)
        {
            return File.WriteAllTextAsync(Path.Combine(_directory, decision.Id + ".json"),
                JsonConvert.SerializeObject(decision, Formatting.Indented));
        }

        public Task<Decision> Get(Guid decisionId)
        {
            return FetchDecision(Path.Combine(_directory, decisionId + ".json"));
        }

        public Task Delete(Guid decisionId)
        {
            var path = Path.Combine(_directory, decisionId + ".json");
            File.Delete(path);
            return Task.CompletedTask;
        }
    }
}