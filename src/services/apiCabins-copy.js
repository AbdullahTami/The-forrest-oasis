import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://sfomcnwajwguvmfejozn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1) Create cabin
  const { data, error } = await supabase
    .from("cabins")
    // Passing the newly added object to the array.
    // Detailed explanation back in the lecture
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // The image uploading operation happens only if there was no error in creating the cabin itself

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
