import pkgutil
import langchain
import langchain_community
import langchain_core

def find_module(package, target):
    for loader, module_name, is_pkg in pkgutil.walk_packages(package.__path__, package.__name__ + "."):
        if target in module_name:
            print(f"Found match: {module_name}")

print("Searching in langchain...")
try:
    from langchain.chains import create_retrieval_chain
    print("Success: from langchain.chains import create_retrieval_chain")
except ImportError as e:
    print(f"Failed: {e}")

print("\nSearching for 'retrieval' in langchain...")
find_module(langchain, "retrieval")

print("\nSearching for 'chains' in langchain...")
find_module(langchain, "chains")
