import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // We pass the id of the cabin that's being edited, which enablles us to know if we're in an edit session or not

  // startsWith method returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at position. Otherwise returns false
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://sfomcnwajwguvmfejozn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1) Create/Edit cabin

  let query = supabase.from("cabins");

  // Passing the newly added object to the array.
  // Detailed explanation back in the lecture

  // A) Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // The image uploading operation happens only if there was no error in creating the cabin itself
  if (hasImagePath) return data;
  // 2) Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Deleting and preveting a cabin from being created in case the image file didn't upload correctly
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could be uploaded and the cabin could not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

/*

const { data, error } = await supabase
  .from('cabins')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()

*/
