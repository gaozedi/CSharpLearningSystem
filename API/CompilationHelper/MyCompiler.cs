using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using API.CompilationHelper;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;

namespace API
{
    public class MyCompiler:IMyCompiler
    {
        static Action<string> Write = Console.WriteLine;

         public string Complie(string code)
        {
            Write("compiler called.");
            Console.WriteLine("input raw code: "+code);
            var codeIndex = code.Split(";");
          //  Console.WriteLine(codeIndex[1]);
            string codeToCompile = $@"
            using System;

            namespace RoslynCompileSample
            {{
                public class Writer
                {{
                    public string Write(string code)
                    {{
                       
                        {code}
                    }}
                }}
            }}";
            // int flag = presetCode.IndexOf("//flag");
            // string codeToCompile=presetCode;
            // foreach (var line in codeIndex)
            // {
            //      codeToCompile = codeToCompile.Insert(flag,line+";" );
            // }
            Console.WriteLine(codeToCompile);

            Write("Parsing the code into the SyntaxTree");
            SyntaxTree syntaxTree = CSharpSyntaxTree.ParseText(codeToCompile);

            string assemblyName = Path.GetRandomFileName();
            var refPaths = new[] {
                typeof(System.Object).GetTypeInfo().Assembly.Location,
                typeof(Console).GetTypeInfo().Assembly.Location,
                Path.Combine(Path.GetDirectoryName(typeof(System.Runtime.GCSettings).GetTypeInfo().Assembly.Location), "System.Runtime.dll")
            };
            MetadataReference[] references = refPaths.Select(r => MetadataReference.CreateFromFile(r)).ToArray();

            Write("Adding the following references");
            foreach (var r in refPaths)
                Write(r);

            Write("Compiling ...");
            CSharpCompilation compilation = CSharpCompilation.Create(
                assemblyName,
                syntaxTrees: new[] { syntaxTree },
                references: references,
                options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

            using (var ms = new MemoryStream())
            {
                EmitResult result = compilation.Emit(ms);

                if (!result.Success)
                {
                    Write("Compilation failed!");
                    IEnumerable<Diagnostic> failures = result.Diagnostics.Where(diagnostic =>
                        diagnostic.IsWarningAsError ||
                        diagnostic.Severity == DiagnosticSeverity.Error);

                    foreach (Diagnostic diagnostic in failures)
                    {
                        Console.Error.WriteLine("\t{0}: {1}", diagnostic.Id, diagnostic.GetMessage());
                    }
                }
                else
                {
                    Write("Compilation successful! Now instantiating and executing the code ...");
                    ms.Seek(0, SeekOrigin.Begin);
                    Assembly assembly = AssemblyLoadContext.Default.LoadFromStream(ms);
                    var type = assembly.GetType("RoslynCompileSample.Writer");
                    var instance = assembly.CreateInstance("RoslynCompileSample.Writer");
                    var meth = type.GetMember("Write").First() as MethodInfo;
                    var exResult = (string)meth.Invoke(instance, new[] { code });
                    return exResult.ToString();
                }
            }
            return "Execution ended.";

        }

    }
}
